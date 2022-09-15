import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cakeActions } from './cakeSlice';

export const CakeView = () => {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  const { ordered, restocked } = cakeActions;

  return (
    <>
      <h3>Total Cakes: {numOfCakes}</h3>
      <button onClick={() => dispatch(ordered())}>Order Cake</button>
      <button onClick={() => dispatch(restocked(3))}>ReStock Cake</button>
    </>
  );
};

export default CakeView;
