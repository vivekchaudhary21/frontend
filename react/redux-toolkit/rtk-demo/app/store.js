import pkg from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import cakeReducer from '../features/cake/cakeSlice';
import icecreamReducer from '../features/icecream/icecreamSlice';
import usersReducer from '../features/user/userSlice';

const { configureStore } = pkg;
const { createLogger } = reduxLogger;
const logger = createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: icecreamReducer,
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
