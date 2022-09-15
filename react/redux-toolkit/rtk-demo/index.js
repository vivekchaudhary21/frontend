import store from './app/store.js';
import { cakeActions } from './features/cake/cakeSlice';
import { icecreamActions } from './features/icecream/icecreamSlice.js';
import { fetchUsers } from './features/user/userSlice.js';

console.log('Initial State ', store.getState());

const unSubscribe = store.subscribe(() => {});

store.dispatch(fetchUsers());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.restocked(3));
// store.dispatch(icecreamActions.ordered());

unSubscribe();
