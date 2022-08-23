import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useUsersQuery } from '../types/generatedTypes';

const Home: NextPage = () => {
  const { data } = useUsersQuery();
  return <div className={styles.container}>{JSON.stringify(data?.users)}</div>;
};

export default Home;
