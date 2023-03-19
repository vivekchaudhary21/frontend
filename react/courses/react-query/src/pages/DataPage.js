import React, { useState, useEffect } from 'react'

export const DataPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/data')
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  if (!data.length) {
    return <h1>Loading ....</h1>
  }

  return <div>{JSON.stringify(data, null)}</div>
}
