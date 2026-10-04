# JobJourney

JobJourney is a personal full-stack project for tracking job applications. It brings application records, search, progress charts, and an Excel export into one dashboard. The project uses the MERN stack (MongoDB, Express, React, and Node.js), with a Vite frontend and a REST API.

## Features

- Register, sign in, sign out, and reset a password through an emailed link.
- Create, edit, and delete applications with a company, position, location, and optional posting URL.
- Track application status (`pending`, `interview`, or `declined`) and job type (`full-time`, `part-time`, or `internship`).
- Search companies and positions; filter by status and type; sort by date or position; paginate results.
- View status totals and bar or area charts for the six most recent months that contain applications.
- Download all of your applications as a `jobs.xlsx` spreadsheet, independent of the current search filters.
- Update your profile and upload an avatar to Cloudinary.
- Use a responsive dashboard with a collapsible sidebar and a dark theme saved in local storage.
- View total user and job counts through an admin-only page.

## Tech stack

| Area | Libraries and purpose |
| --- | --- |
| Frontend | React 19 and React DOM; Vite 8 for development and production builds |
| Routing and forms | React Router 7, using nested routes, loaders, actions, and `<Form>` |
| Server state | TanStack Query 5 for caching, fetching, and invalidating API data |
| UI | CSS Modules, global CSS, React Icons, React Toastify 11, and Recharts 3 |
| HTTP and dates | Axios and Day.js |
| Backend | Node.js, Express 4, and ES modules |
| Database | MongoDB (local or Atlas) and Mongoose 9 |
| Authentication | bcryptjs password hashing and JSON Web Tokens in HTTP-only cookies |
| API middleware | express-validator, express-rate-limit, Helmet, express-mongo-sanitize, and cookie-parser |
| Integrations | Cloudinary for avatars, Multer 2 for uploads, Resend for reset emails, and ExcelJS for exports |
| Development and checks | Node's built-in watch mode, concurrently, ESLint 9, Vitest 5, jsdom, and React Testing Library |

Exact installed versions are recorded in the root and `client/` lockfiles.

## Local setup

### Prerequisites

- **Node.js 24 LTS** is recommended; `.nvmrc` selects major version 24. The dependency set supports Node `^22.22.2`, `^24.15.0`, or `>=26.0.0`.
- npm (bundled with Node.js).
- A running MongoDB instance or a MongoDB Atlas connection string. For Atlas, allow your machine's IP and create a database user.
- Cloudinary and Resend accounts if you want avatar uploads and password-reset emails. Both integrations are optional for basic application tracking.

### Install and configure

Clone or download the repository, then run these commands from its root:

```bash
# If you use nvm:
nvm install
nvm use

# Install both packages using their committed lockfiles:
npm run setup-project

# For a new checkout; preserve an existing .env if you already have one:
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and a strong `JWT_SECRET`. Generate a secret with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

The root `.env` is ignored by Git. Never put server credentials into frontend variables prefixed with `VITE_`, because those variables can be included in browser bundles.

| Variable | Purpose / local default |
| --- | --- |
| `NODE_ENV` | `development` enables HTTP request logging; use `production` when deploying |
| `PORT` | API port; defaults to `5100`. The Vite proxy reads this value from the root environment |
| `MONGO_URL` | MongoDB connection string; the example uses `mongodb://127.0.0.1:27017/job-journey` |
| `JWT_SECRET` | Secret used to sign and verify authentication tokens; replace the example value |
| `JWT_EXPIRES_IN` | Token lifetime; use `1d` to match the current one-day cookie lifetime |
| `BASE_URL` | Public frontend origin for password-reset links; locally `http://localhost:5173` |
| `CLOUDINARY_NAME` | Cloudinary cloud name, required for avatar uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key, required for avatar uploads |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret, required for avatar uploads |
| `RESEND_API_KEY` | Resend API key, required for password-reset emails |
| `SENDER_EMAIL` | Sender address for reset emails; the example uses `onboarding@resend.dev` |

For Resend, use a sender and recipient permitted by your account. A deployed app should use a verified sending domain. Without a Resend key, the app still starts, and the reset endpoint reports that email is not configured.

### Run the app

```bash
npm run dev
```

This starts the API with Node's file watcher and the Vite dev server together:

- Frontend: **http://localhost:5173**
- API: **http://localhost:5100/api/v1** (or your configured `PORT`)

Register an account, sign in, and add your first application. The first account registered in an empty database becomes an admin; later accounts receive the user role. Restart development servers after changing environment variables.

## How it works

1. **Routing and API access:** The React app defines public pages and a nested `/dashboard` layout. Axios sends requests to `/api/v1`. In development, Vite forwards `/api` to Express; in production, Express serves the built frontend and API from the same origin.
2. **Authentication:** Registration hashes the password before saving a user. Login signs a JWT containing the user ID and role and sets an HTTP-only `token` cookie. API middleware verifies the cookie for protected routes. Production cookies use the `secure` flag and require HTTPS.
3. **Loading and mutations:** React Router loaders fetch or warm TanStack Query's cache before a page renders. Components subscribe to those queries. Form actions submit changes to the API, invalidate affected queries, and redirect or show toast messages. Cached queries have a five-minute default stale time.
4. **Application ownership:** Jobs reference their creator through `createdBy`. Lists, statistics, and exports are scoped to the current user. Single-job validation allows access by the owner or an admin.
5. **Search and statistics:** Search filters live in the URL so the API can apply them alongside sorting and pagination (10 jobs per page by default). MongoDB aggregation calculates status totals and monthly application counts for the charts.
6. **Uploads and email:** Multer reads an avatar into memory, converts it to a data URI, and uploads it to Cloudinary. Password reset saves a random token with a 30-minute expiry and sends a link through Resend; a successful reset clears the token.

## Repository layout

```text
app.js                 Express app, middleware, routes, and frontend serving
server.js              MongoDB connection and HTTP server startup
controllers/           Authentication, job, profile, and admin handlers
routes/                REST endpoint definitions
middleware/            Authentication, input validation, uploads, and errors
models/                Mongoose User and Job schemas
errors/                Custom HTTP error classes
utils/                 JWT/password helpers, constants, and sample data
tests/                Backend smoke tests (mocked database calls)
client/
  src/App.jsx          Browser routes and shared query client
  src/pages/           Pages, loaders, actions, and dashboard context
  src/components/      Forms, navigation, job cards, pagination, and charts
  src/assets/          SVG images and shared CSS Modules
  src/utils/           Axios client, theme helpers, and UI constants
  tests/               Component tests
  vite.config.js       React plugin and development API proxy
  vitest.config.js     jsdom test environment and setup
.env.example           Environment template without credentials
.nvmrc                 Recommended Node.js major version
```

## API overview

All paths below are relative to `/api/v1`. Protected endpoints expect the `token` cookie set by login.

| Method | Path | Purpose | Access |
| --- | --- | --- | --- |
| POST | `/auth/register` | Create an account | Public |
| POST | `/auth/login` | Sign in and set the cookie | Public |
| GET | `/auth/logout` | Expire the cookie | Public |
| POST | `/auth/reset` | Email a password-reset link | Public |
| POST | `/auth/newpassword` | Change a password using a reset token | Public, valid token required |
| GET / POST | `/jobs` | List or create applications | Signed in |
| GET / PATCH / DELETE | `/jobs/:id` | Read, update, or delete an application | Owner or admin |
| GET | `/jobs/stats` | Status counts and monthly applications | Signed in |
| GET | `/jobs/downloadExcel` | Download all owned jobs as XLSX | Signed in |
| GET / PATCH | `/users/current` | Read or update a profile (multipart form for an avatar) | Signed in |
| GET | `/admin/app-stats` | Total users and jobs | Admin |

`GET /jobs` accepts `search`, `jobStatus`, `jobType`, `sort`, `page`, and `limit`. Use `all` for an unrestricted status/type; sorting accepts `newest`, `oldest`, `a-z`, and `z-a`. Unknown API paths return a JSON 404 response.

## Scripts and checks

Run from the repository root unless specified otherwise:

| Command | Purpose |
| --- | --- |
| `npm run setup-project` | Install locked server and client dependencies |
| `npm run dev` | Run server and client together |
| `npm run server` / `npm run client` | Run either development process separately |
| `npm run build-client` | Build the frontend into `client/dist` |
| `npm run lint` | Lint frontend source, tests, and configuration |
| `npm test` | Run backend smoke tests, then frontend component tests once |
| `npm run test --prefix client` | Run frontend tests in watch mode |
| `npm run test:ui --prefix client` | Open the Vitest UI |
| `npm run setup-production` | Install both packages including build tools, then build the frontend |
| `npm start` | Run the API and serve the built frontend |

Backend tests use temporary localhost servers and mocked database methods; they do not require MongoDB, Cloudinary, or Resend credentials. Frontend tests cover form fields, navigation, sidebars, chart switching, and isolation of the backend environment from Vite. Live database and external-service behavior still needs manual verification with your own development accounts.

To inspect dependency advisories:

```bash
npm audit
npm audit --prefix client
```

## Production setup

```bash
npm run setup-production
# Set NODE_ENV=production, BASE_URL, and the other server variables in your host.
npm start
```

Express serves `client/dist` and falls back to `index.html` for browser routes such as `/dashboard/jobs`. Deploy behind HTTPS so secure authentication cookies work, and set `BASE_URL` to the deployed origin so password-reset emails point to the right app. Run commands from the repository root so the environment file is found. Vite's `preview` command only previews the static frontend; use `npm start` to run the complete built app.

## Demo data and maintenance notes

- **Demo login:** The “Explore as a test user” button uses an existing `test@email.com` account. A fresh database does not include it. Read-only demo restrictions currently check a hard-coded user ID in `middleware/authMiddleware.js`; if you create your own demo account, that ID must match its MongoDB `_id`.
- **Sample data:** `utils/populate.js` loads `utils/MOCK_DATA.json` for the test account. From `utils/`, run `node populate.js` only after creating that account. It **deletes and replaces all jobs belonging to that account**, so use it with a disposable development database.
- **Compatibility choices:** Express remains on maintained 4.x because `express-mongo-sanitize` writes to request properties that changed in Express 5 ([migration guide](https://expressjs.com/en/guide/migrating-5.html)). ESLint remains on 9.x because `eslint-plugin-react` currently declares support through ESLint 9.
- **Dependency cleanup:** Node provides crypto, file watching, and buffer-to-base64 conversion, replacing the obsolete npm `crypto` package, nodemon, and datauri. Scoped overrides update ExcelJS's UUID dependency and the older minimatch branch's brace-expansion dependency; workbook tests cover the ExcelJS override.
- **Upgrade references:** [React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [Vite](https://vite.dev/guide/migration), [Mongoose 9](https://mongoosejs.com/docs/migrating_to_9.html), and [Recharts 3](https://github.com/recharts/recharts/wiki/3.0-migration-guide).
- **Build output:** Vite currently reports a bundle-size warning because the app ships its routes and chart libraries in one main bundle. The production build succeeds; lazy-loading routes or charts is a possible future optimization. Some transitive packages used by ExcelJS and Resend also emit deprecation notices even though the updated lockfiles pass `npm audit`.
- **License:** The root package declares ISC; the repository does not currently include a separate license file.
