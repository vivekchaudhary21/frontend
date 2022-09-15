import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { words as data, TIME_LIMIT } from '../data/words';

const Homepage = () => {
  const [word, setWord] = useState(data[0]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(TIME_LIMIT);

  useEffect(() => {
    let intervalId = '';
    if (intervalId === '') {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }

    if (counter === 0) {
      clearInterval(intervalId);
      index < data.length - 1 && checkWord();
    }

    return () => clearInterval(intervalId);
  }, [counter]);

  useEffect(() => {
    setWord(data[index]);
  }, [index]);

  // todo: remove this line to make this code work
  // vsdvsd;

  const checkWord = () => {
    if (value.toLowerCase() === word.word.toLowerCase()) {
      // alert('Correct answer');
    } else {
      // alert(`Wrong Answer, correct word was ${word.word}`);
    }
    setIndex((prevIdx) =>
      prevIdx === data.length - 1 ? data.length - 1 : prevIdx + 1
    );
    setValue('');
    setCounter(TIME_LIMIT);
  };

  const getShuffledWord = (word) => {
    let shuffledWord = '';
    for (let i = word.length - 1; i >= 0; i--) {
      shuffledWord += word[i];
    }
    return shuffledWord;
  };

  console.log(index);

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <h1 className={styles.title}>Word Scramble</h1>
        <hr />
        <h2 className={styles.word}>{getShuffledWord(word.word)}</h2>
        <p className={styles.hint}>{word.hint}</p>
        <p className='time-left'>Time left: {counter}s</p>
        <input
          className={styles.input}
          type='text'
          placeholder='Enter a valid word'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <br />
        <button className={styles.refresh}>Refresh Word</button>
        <button
          className={styles.checkWord}
          onClick={checkWord}
          disabled={index === data.length - 1}
        >
          Check Word
        </button>
      </div>
    </div>
  );
};

export default Homepage;
