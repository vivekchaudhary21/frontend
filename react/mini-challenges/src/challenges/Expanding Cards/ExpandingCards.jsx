import React, { useState } from 'react'
import data from './data.json'
import styles from './expandingcards.module.css'

export const ExpandingCards = () => {
  const [activeIndex, setactiveIndex] = useState(1)
  return (
    <div className={styles.container}>
      {data.map((image, index) => (
        <div
          key={image.name}
          className={`${styles.panel} ${
            index === activeIndex && styles.active
          }`}
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
