import React, { useState } from 'react'
import styles from './dadjokes.module.css'

export const DadJokes = () => {
  const [joke, setJoke] = useState('')
  const [allJokes, setAllJokes] = useState([])
  const [isLoadingJoke, setIsLoadingJoke] = useState(false)
  const [showAllJokes, setShowAllJokes] = useState(false)

  const getJoke = async () => {
    //   fetch('https://icanhazdadjoke.com', {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then(({ joke }) => setJoke(joke))
    //     .catch((e) => console.log(e.message))

    try {
      setIsLoadingJoke(true)
      const response = await fetch('https://icanhazdadjoke.com', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const { joke } = await response.json()
      setJoke(joke)
      setIsLoadingJoke(false)
      setAllJokes((jokes) => [...jokes, joke])
    } catch (error) {}
  }

  const resetJokes = () => {
    setJoke('')
    setAllJokes([])
  }

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <h3>Don't Laugh Challenge</h3>
        <h3>Total jokes - {allJokes.length}</h3>
        <div id="joke" className={styles.joke}>
          {joke}
        </div>
        <button
          className={styles.btn}
          onClick={getJoke}
          disabled={isLoadingJoke}
        >
          {isLoadingJoke
            ? 'Loading Joke'
            : joke
            ? 'Get Another Joke'
            : 'Get  Joke'}
        </button>
        <button
          className={`${styles.btn} ${styles.resetBtn}`}
          onClick={resetJokes}
        >
          Reset
        </button>
        {allJokes.length > 0 && (
          <button
            className={`${styles.btn} ${styles.resetBtn}`}
            onClick={() => setShowAllJokes((show) => !show)}
          >
            {showAllJokes ? 'Hide All Jokes' : 'Show All Jokes'}
          </button>
        )}
      </div>
      <ol className={styles.allJokes}>
        {showAllJokes &&
          allJokes.map((joke) => (
            <li className={styles.listItem} key={joke}>
              {joke}
            </li>
          ))}
      </ol>
    </div>
  )
}
