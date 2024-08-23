import { useLoaderData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import baseFetch from '../../utils/apiService';

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

  return <Wrapper>Admin</Wrapper>;
};

export default Admin;

const Wrapper = styled.div``;
