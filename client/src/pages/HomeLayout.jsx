import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <header>Nav Bar</header>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
