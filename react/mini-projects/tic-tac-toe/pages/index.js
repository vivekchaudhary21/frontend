import React, { useState, useEffect } from 'react';
import Square from '../Components/Square';

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialState = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
};

const index = () => {
  const [state, setState] = useState(initialState);
  const [tic, setTic] = useState('x');

  useEffect(() => {
    setTic(tic === 'o' ? 'x' : 'o');
    setTimeout(() => {
      winningPattern.forEach((pattern) => {
        if (
          (state[pattern[0]] === 'x' &&
            state[pattern[1]] === 'x' &&
            state[pattern[2]] === 'x') ||
          (state[pattern[0]] === 'o' &&
            state[pattern[1]] === 'o' &&
            state[pattern[2]] === 'o')
        ) {
          alert('winnner');
          setState(initialState);
          setTic('x');
        }
      }, 0);
    });
  }, [state]);

  const changeState = (blockNum) => {
    setState((prevState) => {
      return {
        ...prevState,
        [blockNum]: tic === 'o' ? 'x' : 'o',
      };
    });
  };

  const onReset = () => {
    setState(initialState);
    setTic('x');
  };
  return (
    <div className='App'>
      <div className='board'>
        <div className='row'>
          <Square val={state[0]} changeState={() => changeState(0)} />
          <Square val={state[1]} changeState={() => changeState(1)} />
          <Square val={state[2]} changeState={() => changeState(2)} />
        </div>
        <div className='row'>
          <Square val={state[3]} changeState={() => changeState(3)} />
          <Square val={state[4]} changeState={() => changeState(4)} />
          <Square val={state[5]} changeState={() => changeState(5)} />
        </div>
        <div className='row'>
          <Square val={state[6]} changeState={() => changeState(6)} />
          <Square val={state[7]} changeState={() => changeState(7)} />
          <Square val={state[8]} changeState={() => changeState(8)} />
        </div>
      </div>
      <button className='reset' onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default index;

/**
 * Rules
 * Player 1 start the game
 * Tab will be selected which player has a turn
 * You can also decide how many games u will play
 * when the games first start player 1 turn and next gam player 2 turn
 * scoreboard will show how many games each player won and draws
 */
