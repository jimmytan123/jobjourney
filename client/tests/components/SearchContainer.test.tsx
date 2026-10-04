import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import SearchContainer from '../../src/components/SearchContainer';

vi.mock('../../src/pages/AllJobs', () => ({
  useAllJobsContext: () => ({ searchValues: {} }),
}));

describe('job search reset', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('resets form controls without treating the reset link as a form input', async () => {
    const router = createMemoryRouter([
      { path: '/dashboard/jobs', element: <SearchContainer /> },
    ], { initialEntries: ['/dashboard/jobs'] });
    render(<RouterProvider router={router} />);

    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'Acme' } });
    expect(search).toHaveValue('Acme');

    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: 'Reset' }));
    });

    expect(search).toHaveValue('');
    expect(router.state.location.pathname).toBe('/dashboard/jobs');
    router.dispose();
  });
});
