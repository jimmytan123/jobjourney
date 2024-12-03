import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NavLinks from '../../src/components/NavLinks';
import SmallSidebar from '../../src/components/SmallSidebar';

//Mock the useDashboardContext hook
vi.mock('../../src/pages/DashboardLayout', () => ({
  useDashboardContext: vi.fn(),
}));

// Import the mocked `useDashboardContext` hook
import { useDashboardContext } from '../../src/pages/DashboardLayout';

describe('SmallSidebar', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    useDashboardContext.mockReset();
  });

  it('should show the sidebar when `showSidebar` is true', () => {
    useDashboardContext.mockReturnValue({
      toggleSidebar: vi.fn(), // mock
      showSidebar: true,
      user: { role: 'admin' },
    });

    render(
      <MemoryRouter>
        <SmallSidebar />
      </MemoryRouter>
    );

    const sideBarContainer = screen.getByTestId('sidebar-container');
    expect(sideBarContainer).toHaveClass('show-sidebar');
  });

  it('should hide the sidebar when `showSidebar` is true', () => {
    useDashboardContext.mockReturnValue({
      toggleSidebar: vi.fn(), // mock
      showSidebar: false,
      user: { role: 'admin' },
    });

    render(
      <MemoryRouter>
        <SmallSidebar />
      </MemoryRouter>
    );

    const sideBarContainer = screen.getByTestId('sidebar-container');
    expect(sideBarContainer).not.toHaveClass('show-sidebar');
  });

  it('should call toggleSidebar if the close button is clicked', async () => {
    const mockedToggleSidebar = vi.fn();
    useDashboardContext.mockReturnValue({
      toggleSidebar: mockedToggleSidebar, // mock
      showSidebar: true,
      user: { role: 'admin' },
    });

    render(
      <MemoryRouter>
        <SmallSidebar />
      </MemoryRouter>
    );

    const clostBtn = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(clostBtn);

    expect(mockedToggleSidebar).toHaveBeenCalled();
  });

  it('calls `toggleSidebar` when the sidebar container is clicked', async () => {
    const mockedToggleSidebar = vi.fn();

    useDashboardContext.mockReturnValue({
      toggleSidebar: mockedToggleSidebar, // mock
      showSidebar: true,
      user: { role: 'admin' },
    });

    render(
      <MemoryRouter>
        <SmallSidebar />
      </MemoryRouter>
    );

    const sidebarContainer = screen
      .getByText(/all jobs/i)
      .closest('.sidebar-container');
      
    const user = userEvent.setup();
    await user.click(sidebarContainer);

    expect(mockedToggleSidebar).toHaveBeenCalled();
  });
});
