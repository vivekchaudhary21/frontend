import React from 'react';

import { CakeView, IcecreamView, UserView } from './features';
import './App.css';

function App() {
  return (
    <div className='App'>
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  );
}

export default App;
