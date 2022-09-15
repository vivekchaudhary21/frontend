import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers } from './userSlice';

export const UserView = () => {
  const { loading, users, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ...</p>;

  return (
    <ul>
      {users.length && users.map(({ id, name }) => <li key={id}>{name}</li>)}
    </ul>
  );
};

export default UserView;
