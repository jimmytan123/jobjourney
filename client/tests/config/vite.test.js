// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    existsSync: vi.fn((path) => String(path).endsWith('/.env') || actual.existsSync(path)),
    readFileSync: vi.fn((path, ...args) => String(path).endsWith('/.env')
      ? 'PORT=5300\nNODE_ENV=development\nJWT_SECRET=server-only\n'
      : actual.readFileSync(path, ...args)),
  };
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('Vite API proxy configuration', () => {
  it('uses the backend port without applying server environment variables to Vite', async () => {
    vi.stubEnv('PORT', undefined);
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('VITE_USER_NODE_ENV', undefined);
    vi.stubEnv('JWT_SECRET', undefined);
    const { default: config } = await import('../../vite.config.js');
    expect(config.server.proxy['/api'].target).toBe('http://localhost:5300');
    expect(process.env.NODE_ENV).toBe('production');
    expect(process.env.VITE_USER_NODE_ENV).toBeUndefined();
    expect(process.env.JWT_SECRET).toBeUndefined();
  });

  it('prefers the shell environment port over the backend file', async () => {
    vi.stubEnv('PORT', '5400');
    const { default: config } = await import('../../vite.config.js');
    expect(config.server.proxy['/api'].target).toBe('http://localhost:5400');
  });
});
