import { memo, useCallback } from 'react'

export const SearchBox = memo(({ searchValue, setSearchValue }) => {
  console.log('Renders Search Box')

  const onChangeHandler = useCallback(
    (e) => {
      setSearchValue(e.target.value)
    },
    [setSearchValue],
  )

  return (
    <input
      type="text"
      placeholder="Search users..."
      value={searchValue}
      onChange={onChangeHandler}
    />
  )
})
