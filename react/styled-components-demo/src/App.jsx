import React from 'react';

import './App.css';
import StyledButton from './components/Button/Button';

function App() {
  return (
    <div className='App'>
      <StyledButton variant='outline'>Button</StyledButton>
      <StyledButton>Button</StyledButton>
    </div>
  );
}

export default App;
