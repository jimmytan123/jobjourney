import type { AdminStatsResponse } from '../../types';
import { useLoaderData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import baseFetch from '../../utils/apiService';
import { FaUserCircle, FaSuitcase } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import styles from '../../assets/styles/StatsPage.module.css';

export const loader = async () => {
  try {
    const { data } = await baseFetch.get<AdminStatsResponse>('/admin/app-stats');

    return data;
  } catch {
    toast.error('You do not have permissions to visit admin page');

    return redirect('/dashboard/jobs');
  }
};

const Admin = () => {
  const { usersCount, jobsCount } = useLoaderData<typeof loader>();

  return (
    <>
      <h4 className="title" style={{ marginBottom: '2rem', textAlign: 'left' }}>
        Weclome Admin user
      </h4>
      <div className={styles.wrapper}>
        <StatCard
          title="Total Users"
          count={usersCount}
          color="#f77f00"
          bgcolor="#fec89a"
          icon={<FaUserCircle />}
        />
        <StatCard
          title="Total Jobs"
          count={jobsCount}
          color="#40916c"
          bgcolor="#95d5b2"
          icon={<FaSuitcase />}
        />
      </div>
    </>
  );
};

export default Admin;
