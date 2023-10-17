import React, { Fragment, useEffect, useState } from 'react'
import styles from './progresssteps.module.css'

const width = [0, 33, 66, 100]

const ProgressSteps = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [disabled, setDisabled] = useState({
    prev: true,
    next: false,
  })
  const currentWidth = width[activeIndex]

  useEffect(() => {
    setDisabled((prevState) => ({
      ...prevState,
      prev: activeIndex === 0 ? true : false,
      next: activeIndex === 3 ? true : false,
    }))
  }, [activeIndex])

  const onPrevButtonClick = () => {
    if (activeIndex === 0) {
      return
    }
    setActiveIndex((idx) => idx - 1)
  }

  const onNextButtonClick = () => {
    if (activeIndex === 3) {
      return
    }
    setActiveIndex((idx) => idx + 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progress}
          id="progress"
          style={{ width: `${currentWidth}%` }}
        ></div>
        {[1, 2, 3, 4].map((value, index) => (
          <Fragment key={value}>
            <div
              className={`${styles.circle} ${
                activeIndex === index && styles.active
              }`}
            >
              {value}
            </div>
          </Fragment>
        ))}
      </div>
      <div>
        <button
          className={styles.btn}
          id="prev"
          disabled={disabled.prev}
          onClick={onPrevButtonClick}
        >
          Prev
        </button>
        <button
          className={styles.btn}
          id="next"
          disabled={disabled.next}
          onClick={onNextButtonClick}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export { ProgressSteps }
