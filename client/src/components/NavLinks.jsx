import React from 'react';
import links from '../utils/navLinks';
import { NavLink } from 'react-router-dom'; //https://reactrouter.com/en/main/components/nav-link
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks = ({ disableToggleSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  const handleLinkClick = (e) => {
    e.stopPropagation(); // disable parent events(sidebar-container)
    toggleSidebar();
  };

  return (
    <div className="nav-links">
      {links.map((link) => {
        // Hide admin link if user does not have permission
        if (link.path === 'admin' && user.role !== 'admin') return;

        return (
          <NavLink
            to={link.path}
            key={link.text}
            className="nav-link"
            onClick={disableToggleSidebar ? null : handleLinkClick}
            end
          >
            <span className="icon">{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
