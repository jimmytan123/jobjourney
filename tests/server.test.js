import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { once } from 'node:events';
import ExcelJS from 'exceljs';
import User from '../models/User.js';
import Job from '../models/Job.js';
import { getHashedPassword, isPasswordMatched } from '../utils/password.js';
import { createJWT, verifyJWT } from '../utils/token.js';
import { formatImage } from '../middleware/multerMiddleware.js';

// Override local configuration before importing the app; no external services are used.
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'job-journey-test-secret';
process.env.JWT_EXPIRES_IN = '1d';
process.env.RESEND_API_KEY = '';

let server;
let baseURL;
const userId = '507f1f77bcf86cd799439011';
const cookie = () => `token=${createJWT({ userId, role: 'user' })}`;

before(async () => {
  const { default: app } = await import('../app.js');
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseURL = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
});

test('bcrypt hashes remain compatible with existing bcrypt hashes', async () => {
  const hash = await getHashedPassword('example-password');
  assert.equal(await isPasswordMatched('example-password', hash), true);
  assert.equal(await isPasswordMatched('wrong-password', hash), false);
  assert.equal(await isPasswordMatched('example-password', hash.replace('$2b$', '$2a$')), true);
});

test('JWTs preserve the user identity and reject tampering', () => {
  const token = createJWT({ userId, role: 'user' });
  assert.equal(verifyJWT(token).userId, userId);
  assert.throws(() => verifyJWT(`${token}tampered`));
});

test('Mongoose validates the job schema and applies defaults', async () => {
  const job = new Job({ company: 'Example', position: 'Developer', createdBy: userId });
  await job.validate();
  assert.equal(job.jobStatus, 'pending');
  assert.equal(job.jobType, 'full-time');
  job.jobStatus = 'invalid';
  await assert.rejects(job.validate(), /jobStatus/);
});

test('unknown API routes return JSON and security headers', async () => {
  const response = await fetch(`${baseURL}/api/v1/missing?search=developer`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { message: 'Not found' });
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
});

test('protected routes reject missing and invalid cookies', async (t) => {
  t.mock.method(console, 'log', () => {});
  for (const headers of [{}, { cookie: 'token=invalid' }]) {
    const response = await fetch(`${baseURL}/api/v1/jobs`, { headers });
    assert.equal(response.status, 401);
    assert.ok((await response.json()).message);
  }
});

test('login validates input before querying the database', async (t) => {
  t.mock.method(console, 'log', () => {});
  const findUser = t.mock.method(User, 'findOne', () => {
    throw new Error('Database must not be called');
  });
  const response = await fetch(`${baseURL}/api/v1/auth/login`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
  });
  assert.equal(response.status, 400);
  assert.equal(findUser.mock.callCount(), 0);
});

test('login returns an HTTP-only JWT cookie with upgraded bcrypt and JWT libraries', async (t) => {
  const password = await getHashedPassword('example-password');
  t.mock.method(User, 'findOne', async () => ({ _id: userId, role: 'user', password }));
  const response = await fetch(`${baseURL}/api/v1/auth/login`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'someone@example.com', password: 'example-password' }),
  });
  assert.equal(response.status, 200);
  const setCookie = response.headers.get('set-cookie');
  assert.match(setCookie, /HttpOnly/);
  assert.equal(verifyJWT(setCookie.match(/^token=([^;]+)/)[1]).userId, userId);
});

test('password reset reports missing email configuration without external calls', async (t) => {
  t.mock.method(console, 'log', () => {});
  const response = await fetch(`${baseURL}/api/v1/auth/reset`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'someone@example.com' }),
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, 'Password reset email is not configured');
});

test('authenticated job creation strips Mongo operators and assigns ownership', async (t) => {
  const create = t.mock.method(Job, 'create', async (data) => data);
  const response = await fetch(`${baseURL}/api/v1/jobs`, {
    method: 'POST', headers: { 'content-type': 'application/json', cookie: cookie() },
    body: JSON.stringify({
      company: 'Example', position: 'Developer', jobLocation: 'Vancouver',
      jobStatus: 'pending', jobType: 'full-time', $unset: { company: 1 },
    }),
  });
  assert.equal(response.status, 201);
  assert.equal(create.mock.calls[0].arguments[0].createdBy, userId);
  assert.equal('$unset' in create.mock.calls[0].arguments[0], false);
});

test('Multer parses an avatar upload and produces a data URI', async (t) => {
  const upload = (await import('../middleware/multerMiddleware.js')).default;
  const { default: express } = await import('express');
  const uploadApp = express();
  uploadApp.post('/upload', upload.single('avatar'), (req, res) => {
    res.json({ uri: formatImage(req.file), name: req.body.name });
  });
  const uploadServer = uploadApp.listen(0, '127.0.0.1');
  await once(uploadServer, 'listening');
  t.after(() => new Promise((resolve) => uploadServer.close(resolve)));
  const form = new FormData();
  form.append('name', 'Example');
  form.append('avatar', new Blob(['image-bytes'], { type: 'image/png' }), 'avatar.png');
  const response = await fetch(`http://127.0.0.1:${uploadServer.address().port}/upload`, {
    method: 'POST', body: form,
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    uri: `data:image/png;base64,${Buffer.from('image-bytes').toString('base64')}`, name: 'Example',
  });
});

test('Excel export produces a readable workbook scoped to the current user', async (t) => {
  const find = t.mock.method(Job, 'find', async () => [{
    company: 'Example', position: 'Developer', jobStatus: 'pending',
    jobType: 'full-time', jobLocation: 'Vancouver', createdAt: new Date('2024-08-01T12:00:00Z'),
  }]);
  const response = await fetch(`${baseURL}/api/v1/jobs/downloadExcel`, {
    headers: { cookie: cookie() },
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-disposition'), /jobs.xlsx/);
  assert.deepEqual(find.mock.calls[0].arguments[0], { createdBy: userId });
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(await response.arrayBuffer()));
  assert.equal(workbook.getWorksheet('Jobs').getCell('B2').value, 'Example');
});

test('ExcelJS conditional formatting remains compatible with the scoped UUID update', async () => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Formatting');
  sheet.getCell('A1').value = 1;
  sheet.addConditionalFormatting({
    ref: 'A1:A2', rules: [{ type: 'iconSet', iconSet: '3Stars',
      cfvo: [{ type: 'percent', value: 0 }, { type: 'percent', value: 33 }, { type: 'percent', value: 67 }],
    }],
  });
  const data = await workbook.xlsx.writeBuffer();
  const copy = new ExcelJS.Workbook();
  await copy.xlsx.load(data);
  assert.equal(copy.getWorksheet('Formatting').getCell('A1').value, 1);
});
