import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { icecreamActions } from './icecreamSlice';

export const IcecreamView = () => {
  const numOfIcecream = useSelector((state) => state.iceCream.numOfIcecream);
  const dispatch = useDispatch();
  const { ordered, restocked } = icecreamActions;

  return (
    <>
      <h3>Total Icecream: {numOfIcecream}</h3>
      <button onClick={() => dispatch(ordered())}>Order Icecream</button>
      <button onClick={() => dispatch(restocked(3))}>ReStock Icecream</button>
    </>
  );
};

export default IcecreamView;
