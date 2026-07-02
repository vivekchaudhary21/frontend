import { memo, useMemo } from 'react'
import { UserCard } from './UserCard'

export const UserList = memo(({ users, searchValue }) => {
  const normalizedSearchValue = searchValue.trim().toLowerCase()

  const filteredUsers = useMemo(
    () =>
      normalizedSearchValue
        ? users.filter((user) =>
            user.name.toLowerCase().includes(normalizedSearchValue),
          )
        : [],
    [normalizedSearchValue, users],
  )

  console.log('Renders User List')

  const handleClick = (e) => {
    const row = e.target.closest('[data-user-id]')

    if (!row) return

    const userid = row.getAttribute('data-user-id')
    console.log(userid)
  }

  return (
    <ul onClick={handleClick}>
      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      {normalizedSearchValue && filteredUsers.length === 0 && (
        <li>No users found.</li>
      )}
    </ul>
  )
})
