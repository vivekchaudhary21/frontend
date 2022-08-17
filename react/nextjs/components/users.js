import React from 'react';

const Users = ({ userslist }) => {
  return (
    <ul>
      {userslist.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
};

export default Users;
