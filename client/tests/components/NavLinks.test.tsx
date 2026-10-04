import { createDashboardContext } from '../fixtures';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NavLinks from '../../src/components/NavLinks';

//Mock the useDashboardContext hook
vi.mock('../../src/pages/DashboardLayout', () => ({
  useDashboardContext: vi.fn(),
}));

// Import the mocked `useDashboardContext` hook
import { useDashboardContext } from '../../src/pages/DashboardLayout';

const mockedUseDashboardContext = vi.mocked(useDashboardContext);

describe('NavLinks Component', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    mockedUseDashboardContext.mockReset();
  });

  it('should display all links for admin users', () => {
    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: vi.fn(), // mock
      user: { role: 'admin' },
    }));

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    expect(screen.getByText(/add job/i)).toBeInTheDocument();
    expect(screen.getByText(/all jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/stats/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });

  it('should not render admin link if user role is not an admin', () => {
    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: vi.fn(),
      user: { role: 'user' },
    }));

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    expect(screen.getByText(/add job/i)).toBeInTheDocument();
    expect(screen.getByText(/all jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/stats/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
  });

  it('should trigger toggleSidebar function when clicking a nav link', async () => {
    const toggleSidebarMock = vi.fn();

    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: toggleSidebarMock, // mock
      user: { role: 'admin' },
    }));

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    const allJobLink = screen.getByText(/all jobs/i);

    const user = userEvent.setup();
    // Click the link
    await user.click(allJobLink);

    expect(toggleSidebarMock).toHaveBeenCalled();
  });

  it('should not trigger toggleSidebar function when clicking a nav link if disableToggleSidebar is true', async () => {
    const toggleSidebarMock = vi.fn();

    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: toggleSidebarMock, // mock
      user: { role: 'admin' },
    }));

    render(
      <MemoryRouter>
        <NavLinks disableToggleSidebar={true} />
      </MemoryRouter>
    );

    const allJobLink = screen.getByText(/all jobs/i);

    const user = userEvent.setup();
    // Click the link
    await user.click(allJobLink);

    expect(toggleSidebarMock).not.toHaveBeenCalled();
  });
});
