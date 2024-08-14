import logo from '../assets/images/logo.svg';
import styled from 'styled-components';

const Logo = () => {
  return <StyledImg src={logo} alt="JobJourney" />;
};

export default Logo;

const StyledImg = styled.img`
  width: 6rem;
  max-height: 100%;
  object-fit: contain;
`;
