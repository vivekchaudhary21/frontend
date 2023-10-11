import React, { useState } from 'react'
import data from './data.json'
import './expandingcards.modules.css'

export const ExpandingCards = () => {
  const [activeIndex, setactiveIndex] = useState(1)
  return (
    <div className="container">
      {data.map((image, index) => (
        <div
          key={image.name}
          className={`panel${index === activeIndex ? ' active' : ''}`}
          style={{
            backgroundImage: `url(${image.imageUrl})`,
          }}
          onClick={() => setactiveIndex(index)}
        >
          <h3>{image.name}</h3>
        </div>
      ))}
    </div>
  )
}
