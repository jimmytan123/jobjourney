import { useState, useRef, useEffect } from 'react';
import styles from './NavUserDropDown.module.css';
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaCircleUser, FaCaretDown } from 'react-icons/fa6';

const NavUserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logoutUser } = useDashboardContext();

  const dropdownOptions = [
    {
      text: 'logout',
      action: () => logoutUser(),
    },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <div className={styles.content}>
        <button
          type="button"
          className="btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className={`img ${styles.img}`} />
          ) : (
            <FaCircleUser />
          )}
          {user?.name}
          <FaCaretDown className={isOpen ? styles.rotateUp : ''} />
        </button>
        <div
          className={`${styles.dropdownContainer} ${isOpen ? styles.showDropdown : ''}`}
        >
          {dropdownOptions.map((option) => {
            return (
              <button
                onClick={option.action}
                key={option.text}
                className={styles.optionBtn}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavUserDropDown;
