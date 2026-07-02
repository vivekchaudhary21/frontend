import React, { useEffect, useState } from 'react'
import { SearchBox } from './components/SearchBox'
import { UserList } from './components/UserList'
import { fetchUsers } from './user'

export const UserSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  console.log('Renders User Search')

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, 300)

    return () => {
      clearInterval(intervalId)
    }
  }, [searchValue])

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true)
        setError('')
        const users = await fetchUsers()
        setUsers(users)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Search - {users.length}</h1>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      {isLoading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      <UserList users={users} searchValue={debouncedSearchValue} />
    </div>
  )
}
