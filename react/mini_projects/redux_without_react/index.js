import {
  createStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} from 'redux';
import reduxLogger from 'redux-logger';

const initialCakeState = {
  numOfCakes: 10,
};

const initialIcecreamState = {
  numOfIcecreams: 20,
};

function orderCake(quantity) {
  return {
    type: 'ORDER_CAKE',
    payload: quantity,
  };
}

function orderIcecream(quantity) {
  return {
    type: 'ORDER_ICECREAM',
    payload: quantity,
  };
}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case 'ORDER_CAKE':
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case 'ORDER_ICECREAM':
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const logger = reduxLogger.createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial State', store.getState());

const unSubscribe = store.subscribe(() => {});

// store.dispatch(orderCake(1));
// store.dispatch(orderCake(2));
// store.dispatch(orderCake(3));

const actions = bindActionCreators(
  { orderCake, orderIcecream },
  store.dispatch
);
actions.orderCake(1);
actions.orderCake(2);
actions.orderCake(3);
actions.orderIcecream(1);
actions.orderIcecream(4);
actions.orderIcecream(4);

unSubscribe();
