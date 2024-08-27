import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
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
    <Wrapper ref={dropdownRef}>
      <div className="wrapper">
        <button
          type="button"
          className="btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="img" />
          ) : (
            <FaCircleUser />
          )}
          {user?.name}
          <FaCaretDown className={isOpen ? 'rotateUp' : ''} />
        </button>
        <div
          className={
            isOpen ? 'dropdown-container show-dropdown' : 'dropdown-container'
          }
        >
          {dropdownOptions.map((option) => {
            return (
              <button
                onClick={option.action}
                key={option.text}
                className="option-btn"
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default NavUserDropDown;

const Wrapper = styled.div`
  position: relative;

  .wrapper {
    position: relative;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    position: relative;
    color: var(--white);
    background-color: var(--primary-500);
    height: 2rem;
  }

  .dropdown-container {
    position: absolute;
    top: calc(100% + 0.3rem);
    left: 0px;
    width: 100%;
    z-index: 999;

    box-shadow: var(--shadow-2);
    text-align: center;

    visibility: hidden;
    opacity: 0;
    border-radius: var(--border-radius);
  }

  .show-dropdown {
    visibility: visible;
    opacity: 1;
  }

  .option-btn {
    width: 100%;
    height: 100%;
    display: inline-block;
    background: none;
    border: none;
    padding: 0.5rem;
    color: var(--text-color);
    background-color: var(--background-secondary-color);
    cursor: pointer;
    text-transform: capitalize;
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .rotateUp {
    transform: rotate(180deg);
  }
`;
