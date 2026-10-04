import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Stats from '../../src/pages/Stats';
import baseFetch from '../../src/utils/apiService';
import type { StatsResponse } from '../../src/types';

afterEach(() => vi.restoreAllMocks());

describe('cached dashboard statistics', () => {
  it('keeps displaying cached data when a background refresh fails', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    const stats: StatsResponse = {
      jobStatusStats: { pending: 5, interview: 3, declined: 2 },
      monthlyApplications: [],
    };
    queryClient.setQueryData(['stats'], stats);
    vi.spyOn(baseFetch, 'get').mockRejectedValue(new Error('Network unavailable'));

    const view = render(
      <QueryClientProvider client={queryClient}>
        <Stats />
      </QueryClientProvider>
    );

    await act(async () => {
      await queryClient.invalidateQueries({ queryKey: ['stats'] });
      // Query notifications are batched into the next timer turn.
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(queryClient.getQueryState(['stats'])?.status).toBe('error');
    expect(screen.getByRole('heading', { name: 'Pending' })).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    view.unmount();
    queryClient.clear();
  });
});
