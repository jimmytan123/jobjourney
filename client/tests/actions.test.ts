import { afterEach, describe, expect, it, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import type { ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { action as addJobAction } from '../src/pages/AddJob';
import { loader as dashboardLoader } from '../src/pages/DashboardLayout';
import baseFetch from '../src/utils/apiService';

afterEach(() => vi.restoreAllMocks());

const jobRequest = (fields: Record<string, string>): ActionFunctionArgs<unknown> => ({
  request: new Request('http://localhost/dashboard', {
    method: 'POST',
    body: new URLSearchParams(fields),
  }),
  params: {},
  context: {},
  url: new URL('http://localhost/dashboard'),
  pattern: '/dashboard',
});

describe('typed route actions and loaders', () => {
  it('returns field validation errors before calling the API', async () => {
    const post = vi.spyOn(baseFetch, 'post');
    const result = await addJobAction(new QueryClient())(jobRequest({ position: 'A' }));

    expect(result).toEqual({
      position: 'Position is required, and must be 2 to 50 characters long',
      company: 'Company is required',
      jobLocation: 'Location is required',
    });
    expect(post).not.toHaveBeenCalled();
  });

  it('shows a network failure without returning an Error as field validation data', async () => {
    vi.spyOn(baseFetch, 'post').mockRejectedValue(new Error('Network unavailable'));
    const showError = vi.spyOn(toast, 'error').mockImplementation(() => 'error-toast');
    const result = await addJobAction(new QueryClient())(jobRequest({
      position: 'Developer', company: 'Acme', jobLocation: 'Vancouver',
    }));

    expect(result).toBeNull();
    expect(showError).toHaveBeenCalledWith('Network unavailable');
  });

  it('preserves a non-HTTP loader error for the route error boundary', async () => {
    const queryClient = new QueryClient();
    const error = new Error('Network unavailable');
    vi.spyOn(queryClient, 'ensureQueryData').mockRejectedValue(error);
    vi.spyOn(console, 'log').mockImplementation(() => {});

    await expect(dashboardLoader(queryClient)()).rejects.toBe(error);
  });

  it('redirects an expired session to login', async () => {
    const queryClient = new QueryClient();
    vi.spyOn(queryClient, 'ensureQueryData').mockRejectedValue({
      isAxiosError: true, response: { status: 401 },
    });
    vi.spyOn(console, 'log').mockImplementation(() => {});

    const response = await dashboardLoader(queryClient)();
    expect(response).toBeInstanceOf(Response);
    if (!(response instanceof Response)) throw new Error('Expected a redirect');
    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/login');
  });
});
