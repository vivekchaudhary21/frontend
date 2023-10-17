import React, { useEffect, useState, useRef } from 'react'
import styles from './scrollanaimation.module.css'

export const ScrollAnimation = () => {
  const [boxes, setBoxes] = useState(() => {
    return Array(100)
      .fill(0)
      .map((v, i) => ({
        content: `Context Box ${i + 1}`,
        show: '',
      }))
  })

  let boxesRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const triggerBottom = (window.innerHeight / 5) * 4
      const updatedBoxes = boxes.map((box, index) => {
        const boxTop = boxesRefs.current[index].getBoundingClientRect().top
        if (boxTop < triggerBottom) {
          box.show = 'show'
        } else {
          box.show = ''
        }

        return box
      })
      setBoxes(updatedBoxes)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Scroll to see the animation</h1>
      {boxes.map((box, index) => (
        <div
          ref={(el) => (boxesRefs.current[index] = el)}
          key={box.content}
          className={`${styles.box} ${box.show && styles.show}`}
        >
          <h2>{box.content}</h2>
        </div>
      ))}
    </div>
  )
}
