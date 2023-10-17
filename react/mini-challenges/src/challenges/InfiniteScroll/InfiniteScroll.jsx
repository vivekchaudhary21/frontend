import React, { useState, useEffect } from 'react'

export const InfiniteScroll = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(() => {
    return Array(100)
      .fill('')
      .map((_, index) => `Index ${index * currentPage}`)
  })

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      const contentHeight = document.body.offsetHeight

      if (scrollY + windowHeight >= contentHeight - 200) {
        setCurrentPage((prevPage) => prevPage + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const newPages = Array(100)
      .fill('')
      .map((_, index) => `Index ${currentPage * index}`)
    setData((pv) => [...pv, ...newPages])
  }, [currentPage])

  return (
    <div
      style={{
        overflow: 'scroll',
        display: 'block',
        textAlign: 'center',
        width: '100vw',
      }}
    >
      <ul>
        {data.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  )
}
