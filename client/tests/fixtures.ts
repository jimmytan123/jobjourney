import { vi } from 'vitest';
import type { DashboardContextValue, User } from '../src/types';

type DashboardOverrides = Partial<Omit<DashboardContextValue, 'user'>> & {
  user?: Partial<User>;
};

export const createDashboardContext = (
  { user, ...overrides }: DashboardOverrides = {}
): DashboardContextValue => ({
  user: {
    _id: 'test-user',
    name: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    location: 'Vancouver',
    role: 'user',
    ...user,
  },
  showSidebar: false,
  isDarkTheme: false,
  toggleSidebar: vi.fn(),
  toggleDarkTheme: vi.fn(),
  logoutUser: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
  ...overrides,
});
