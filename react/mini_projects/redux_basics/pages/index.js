import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const index = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>React Redux Basics</h1>
      <h2>{counter}</h2>
      <button onClick={() => dispatch({ type: 'INC', payload: 5 })}>
        Increment
      </button>
    </div>
  );
};

export default index;
