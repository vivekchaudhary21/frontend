import React from 'react';

function Square({ val, changeState }) {
  return (
    <button className='square' onClick={changeState} disabled={!!val}>
      {val}
    </button>
  );
}

export default Square;
