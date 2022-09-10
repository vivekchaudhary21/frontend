import { createStore } from 'redux';

const reducerFn = (state = { counter: 10 }, action) => {
  if (action.type === 'INC') {
    return {
      counter: state.counter + action.payload,
    };
  }
  return state;
};
const store = createStore(reducerFn);

export { store };
