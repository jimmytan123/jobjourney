import { createDashboardContext } from '../fixtures';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SmallSidebar from '../../src/components/SmallSidebar';
import styles from '../../src/components/SmallSidebar.module.css';

const showSidebarClass = styles.showSidebar;
if (!showSidebarClass) throw new Error('Missing visible sidebar class');

//Mock the useDashboardContext hook
vi.mock('../../src/pages/DashboardLayout', () => ({
  useDashboardContext: vi.fn(),
}));

// Import the mocked `useDashboardContext` hook
import { useDashboardContext } from '../../src/pages/DashboardLayout';

const mockedUseDashboardContext = vi.mocked(useDashboardContext);

describe('SmallSidebar', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    mockedUseDashboardContext.mockReset();
  });

  it('should show the sidebar when `showSidebar` is true', () => {
    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: vi.fn(), // mock
      showSidebar: true,
      user: { role: 'admin' },
    }));

    render(
      <MemoryRouter>
        <SmallSidebar />
      </MemoryRouter>
    );

    const sideBarContainer = screen.getByTestId('sidebar-container');
    expect(sideBarContainer).toHaveClass(showSidebarClass);
  });

  it('should hide the sidebar when `showSidebar` is false', () => {
    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: vi.fn(), // mock
      showSidebar: false,
      user: { role: 'admin' },
    }));

    render(
      <MemoryRouter>
        <SmallSidebar />
      </MemoryRouter>
    );

    const sideBarContainer = screen.getByTestId('sidebar-container');
    expect(sideBarContainer).not.toHaveClass(showSidebarClass);
  });

  it('should call toggleSidebar if the close button is clicked', async () => {
    const mockedToggleSidebar = vi.fn();
    
    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: mockedToggleSidebar, // mock
      showSidebar: true,
      user: { role: 'admin' },
    }));

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

    mockedUseDashboardContext.mockReturnValue(createDashboardContext({
      toggleSidebar: mockedToggleSidebar, // mock
      showSidebar: true,
      user: { role: 'admin' },
    }));

    render(
      <MemoryRouter>
        <SmallSidebar />
      </MemoryRouter>
    );

    const sidebarContainer = screen.getByTestId('sidebar-container');
      
    const user = userEvent.setup();
    await user.click(sidebarContainer);

    expect(mockedToggleSidebar).toHaveBeenCalled();
  });
});
