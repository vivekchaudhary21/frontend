import React, { useState, useEffect } from 'react';
import Users from '../components/users';

const users = ({ users }) => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch(
  //       'https://jsonplaceholder.typicode.com/users'
  //     );
  //     const users = await response.json();
  //     setUsers(users);
  //   }
  //   getData();
  // }, []);

  return <Users userslist={users} />;
};

export default users;

// static site generation with data
export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return {
    props: {
      users,
    },
  };
}
