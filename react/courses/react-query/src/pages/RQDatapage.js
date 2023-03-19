import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const getData = () => {
  return fetch('http://localhost:4000/data').then((res) => res.json())
}

export const RQDatapage = () => {
  const [val, setVal] = useState('')
  const { data, isLoading, isError, error } = useQuery('rq-data', getData, {
    onSuccess: (data) => {
      console.log('Perform sside effect after success', data)
    },
    onError: (error) => {
      console.log('Perform side effect after error', error)
    },
  })

  if (isLoading) {
    return <div>LOADING RQDatapage</div>
  }

  if (isError) {
    return <div>ERROR LOADING RQDatapage - {error.message}</div>
  }

  return (
    <div>
      <h1>Names</h1>
      <ul>
        {data.length > 0 &&
          data.map((val) => (
            <Link to={`/rqdata/${val.id}`}>
              <li key={val.id}>{val.name}</li>
            </Link>
          ))}
      </ul>
    </div>
  )
}
