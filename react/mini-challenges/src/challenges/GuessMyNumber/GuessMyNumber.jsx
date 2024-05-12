import React, { useEffect, useRef, useState } from 'react'
import styles from './guessmyumber.module.css'

export const GuessMyNumber = () => {
  const [score, setScore] = useState(20)
  const [inputValue, setInputValue] = useState('')
  const magicalNumber = useRef(null)
  const [messageText, setMessageText] = useState('Start guessing ...')
  const number = messageText === 'Your guessed right' ? inputValue : '?'
  const [highScore, setHS] = useState(0)

  useEffect(() => {
    magicalNumber.current = Math.floor(Math.random() * 20) + 1
  }, [])

  useEffect(() => {
    if (messageText === 'Your guessed right') {
      setHS((hs) => Math.max(score, hs))
    }
  }, [messageText, score])

  const onChangeHandler = (e) => {
    setInputValue(Number(e.target.value))
  }

  const onCheckClickHandler = () => {
    console.log(magicalNumber.current, inputValue)
    if (magicalNumber.current === inputValue) {
      setMessageText('Your guessed right')
      setScore((sc) => sc - 1)
    } else if (magicalNumber.current < inputValue) {
      setMessageText('Too high ....')
      setScore((sc) => sc - 1)
    } else {
      setMessageText('Too low ....')
      setScore((sc) => sc - 1)
    }
  }

  const onAgainClickHandler = () => {
    setMessageText('Start guessing ...')
    setInputValue(0)
    setScore(20)
    magicalNumber.current = Math.floor(Math.random() * 20) + 1
  }
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
        <div className={styles.number}>{number}</div>
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
          <p className={styles.message}>{messageText}</p>
          <p className={styles.labelScore}>
            💯 Score: <span className={styles.score}>{score}</span>
          </p>
          <p className={styles.labelHighscore}>
            🥇 Highscore: <span className={styles.highscore}>{highScore}</span>
          </p>
        </section>
      </main>
    </div>
  )
}
