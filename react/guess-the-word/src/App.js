import React, { useState, useEffect } from 'react';
import { wordList } from './data';
import './App.css';

function App() {
  const [letter, setLetter] = useState('');
  const [guesses, setGuesses] = useState(8);
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(wordList[index]);
  const [wrongGuess, setWrongGuess] = useState([]);
  const [correctGuess, setCorrectGuess] = useState({});

  const { word: currentWord, hint: currentHint } = word;

  const resetGame = () => {
    setIndex(0);
    setGuesses(8);
    setWord(wordList[index]);
    setCorrectGuess({});
  };

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      setLetter(e.key.toLowerCase());
    });
  }, []);

  useEffect(() => {
    if (currentWord.includes(letter)) {
      const idx = currentWord.indexOf(letter);

      setCorrectGuess((prevState) => {
        return {
          ...prevState,
          [idx]: letter,
        };
      });
    } else {
      setWrongGuess((prevState) => prevState.concat(letter));
      setGuesses((g) => g - 1);
    }
  }, [letter]);

  useEffect(() => {
    if (Object.values(correctGuess).join('') === currentWord) {
      setTimeout(() => {
        setIndex((i) => i + 1);
        setCorrectGuess({});
      }, 500);
      setTimeout(() => {
        alert('Your number is correct');
      }, 500);
    }
  }, [correctGuess]);

  useEffect(() => {
    if (guesses === 0) {
      setIndex((i) => i + 1);
    }
  }, [guesses]);

  useEffect(() => {
    setWord(wordList[index]);
    setCorrectGuess({});
    setWrongGuess([]);
    setGuesses(8);
  }, [index]);

  return (
    <div className='Container'>
      <div className='App'>
        <h3 className='Title'>Guess the Word</h3>
        <hr />
        <div className='Main-Content'>
          <div className='Input-Content'>
            {[...currentWord].map((w, index) => {
              return (
                <p key={index} className='Input'>
                  {correctGuess[index]}
                </p>
              );
            })}
          </div>
          <p>Hint: {currentHint}</p>
          <p>Remaining Gueses: {guesses}</p>
          <p>Wrong Letter: {JSON.stringify(wrongGuess)}</p>
          <button className='Button' onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
