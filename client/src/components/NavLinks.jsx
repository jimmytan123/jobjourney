import links from '../utils/navLinks';
import { NavLink } from 'react-router-dom'; //https://reactrouter.com/en/main/components/nav-link
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks = () => {
  const { toggleSidebar } = useDashboardContext();

  const handleLinkClick = (e) => {
    e.stopPropagation(); // disable parent events(sidebar-container)
    toggleSidebar();
  };

  return (
    <div className="nav-links">
      {links.map((link) => {
        return (
          <NavLink
            to={link.path}
            key={link.text}
            className="nav-link"
            onClick={handleLinkClick}
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
