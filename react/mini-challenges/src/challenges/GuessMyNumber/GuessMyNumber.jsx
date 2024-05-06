import React, { useEffect, useRef, useState } from 'react'
import styles from './guessmyumber.module.css'

export const GuessMyNumber = () => {
  const [inputValue, setInputValue] = useState()
  const magicalNumber = useRef(null)

  useEffect(() => {
    magicalNumber.current = Math.floor(Math.random() * 20) + 1
  }, [])

  const onChangeHandler = (e) => {
    setInputValue(Number(e.target.value))
  }

  const onCheckClickHandler = () => {
    console.log(magicalNumber.current, inputValue)
    if (magicalNumber.current === inputValue) {
      //
    } else if (magicalNumber.current < inputValue) {
      //
    } else {
      //
    }
  }

  const onAgainClickHandler = () => {}
  return (
    <div className={styles.container}>
      <header>
        <h1>Guess My Number!</h1>
        <p className={styles.between}>(Between 1 and 20)</p>
        <button
          className={`${styles.btn} ${styles.again}`}
          onClick={onAgainClickHandler}
        >
          Again!
        </button>
        <div className={styles.number}>?</div>
      </header>
      <main>
        <section className={styles.left}>
          <input
            type="number"
            className={styles.guess}
            min="1"
            max="20"
            value={inputValue}
            onChange={onChangeHandler}
          />
          <button
            className={`${styles.btn} ${styles.check}`}
            onClick={onCheckClickHandler}
          >
            Check!
          </button>
        </section>
        <section className={styles.right}>
          <p className={styles.message}>Start guessing...</p>
          <p className={styles.labelScore}>
            💯 Score: <span className={styles.score}>20</span>
          </p>
          <p className={styles.labelHighscore}>
            🥇 Highscore: <span className={styles.highscore}>0</span>
          </p>
        </section>
      </main>
    </div>
  )
}
