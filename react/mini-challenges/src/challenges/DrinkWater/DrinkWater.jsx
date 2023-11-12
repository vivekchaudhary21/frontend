import React, { useState } from 'react'
import styles from './drinkwater.module.css'

export const DrinkWater = () => {
  const [totalCups, setTotalCups] = useState(() => {
    return new Array(10).fill(null).map((cup, index) => ({
      number: index + 1,
      fill: false,
    }))
  })

  const onCupClicked = (number) => {
    setTotalCups((pv) =>
      pv.map((cup) => {
        if (cup.number <= number) {
          return {
            ...cup,
            fill: true,
          }
        }
        return cup
      })
    )
  }

  const height = totalCups.reduce((acc, val) => {
    if (val.fill) {
      acc++
    }
    return acc
  }, 0)

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading1}>Drink Water</h1>
      <h3 className={styles.heading3}>Goal: 2 Liters</h3>

      <div className={styles.cup}>
        {height !== totalCups.length && (
          <div className={styles.remained} id="remained">
            <span id="liters"></span>
            <small>{totalCups.length - height} cups remained</small>
          </div>
        )}

        <div
          className={styles.percentage}
          style={{ height: `${height * 10}%` }}
          id="percentage"
        >
          {`${height * 10}%`}
        </div>
      </div>

      <p className={styles.text}>
        Select how many glasses of water that you have drank
      </p>
      <div className={styles.cups}>
        {totalCups.map((cup) => (
          <div
            key={cup.number}
            className={`${styles.cupSmall} ${cup.fill ? styles.full : ''}`}
            onClick={() => onCupClicked(cup.number)}
          >
            <p>Cup {cup.number}</p>
            <p>200 ml</p>
          </div>
        ))}
      </div>
    </div>
  )
}
