import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

import { useUsersQuery } from '../types/generatedTypes';
import {} from './';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { data, loading, error } = useUsersQuery();
  if (loading || error) return <p>Please Wait</p>;
  return <div className={styles.container}>{JSON.stringify(data)}</div>;
};

export default Home;
