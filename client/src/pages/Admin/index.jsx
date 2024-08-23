import { useLoaderData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import baseFetch from '../../utils/apiService';
import { FaUserCircle, FaSuitcase } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import Wrapper from '../../assets/styles/styledStatsPage';

export const loader = async () => {
  try {
    const { data } = await baseFetch.get('/admin/app-stats');

    return data;
  } catch (err) {
    toast.error('You do not have permissions to visit admin page');

    return redirect('/dashboard/jobs');
  }
};

const Admin = () => {
  const { usersCount, jobsCount } = useLoaderData();

  return (
    <>
      <h4 className="title" style={{ marginBottom: '2rem', textAlign: 'left' }}>
        Weclome Admin user
      </h4>
      <Wrapper>
        <StatCard
          title="Total Users"
          count={usersCount}
          color="#f77f00"
          bgColor="#fec89a"
          icon={<FaUserCircle />}
        />
        <StatCard
          title="Total Jobs"
          count={jobsCount}
          color="#40916c"
          bgColor="#95d5b2"
          icon={<FaSuitcase />}
        />
      </Wrapper>
    </>
  );
};

export default Admin;
