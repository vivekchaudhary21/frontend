import styled, { keyframes } from 'styled-components';

const StyledButton = styled.button`
  border: 2px solid #4caf50;
  background-color: ${(props) =>
    props.variant === 'outline' ? '#FFF' : '#4caf50'};
  color: ${(props) => (props.variant === 'outline' ? '#4caf50' : '#FFF')};
  margin: 5px;
  padding: 20px 60px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: ${(props) =>
      props.variant !== 'outline' ? '#FFF' : '#4caf50'};
    color: ${(props) => (props.variant !== 'outline' ? '#4caf50' : '#FFF')};
  }
`;

// Extending Styles
const FancyButton = styled(StyledButton)`
  background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%);
  border: none;
`;

// using html attributes
const SubmitButton = styled(StyledButton).attrs({
  type: 'submit',
})`
  box-shadow: 0 9px #999;
  &:active {
    background-color: ${(props) =>
      props.variant !== 'outline' ? '#FFF' : '#4caf50'};
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AnimatedLogo = styled.img`
  height: 100px;
  pointer-events: none;
  animation: ${rotate} infinite 2s linear;
`;

const DarkButton = styled(StyledButton)`
  border: 2px solid ${(props) => props.theme.dark.primary};
  background-color: ${(props) => props.theme.dark.primary};
  color: ${(props) => props.theme.dark.text};
`;

export { StyledButton, FancyButton, SubmitButton, AnimatedLogo, DarkButton };
