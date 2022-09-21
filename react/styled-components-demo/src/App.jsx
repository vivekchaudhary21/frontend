import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import logo from './logo.png';
import './App.css';
// import './styles.css';
import {
  StyledButton,
  FancyButton,
  SubmitButton,
  AnimatedLogo,
  DarkButton,
} from './components/Button/Button';

const theme = {
  light: {
    primary: '#fff',
    text: '#000',
  },
  dark: {
    primary: '#000',
    text: '#fff',
  },
  fontFamily: 'Segoe UI',
};

const GlobalStyles = createGlobalStyle`
  button {
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <GlobalStyles />
        <AnimatedLogo src={logo} />
        <StyledButton variant='outline'>Button</StyledButton>
        <StyledButton>Button</StyledButton>
        <SubmitButton>Submit Button</SubmitButton>
        <FancyButton>Fancy Button</FancyButton>
        <DarkButton>Dark Button</DarkButton>
        <AnimatedLogo src={logo} />
      </div>
    </ThemeProvider>
  );
}

export default App;
