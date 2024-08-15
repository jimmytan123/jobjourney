import { useDashboardContext } from '../pages/DashboardLayout';
import styled from 'styled-components';
import { MdLightMode, MdModeNight } from 'react-icons/md';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <MdModeNight className="theme-icon" />
      ) : (
        <MdLightMode className="theme-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;

const Wrapper = styled.button`
  background-color: transparent;
  border: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  width: 3rem;
  height: 100%;

  .theme-icon {
    font-size: 1.5rem;
    color: var(--text-color);
  }
`;
