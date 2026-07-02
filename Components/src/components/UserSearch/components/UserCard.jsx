import React from 'react'

export const UserCard = React.memo(({ user }) => {
  console.log('Renders User Card')

  return <li data-user-id={user.id}>{user.name}</li>
})
