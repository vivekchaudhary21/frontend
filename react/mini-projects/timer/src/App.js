import './App.css';
import Countdown from './Countdown';

function App() {
  return (
    <div className='app'>
      <div className='main'>
        <p>This is a comment posted by someone</p>
        <p>
          Updated on:{' '}
          <Countdown timestamp={'Fri Jul 22 2022 10:56:04 GMT+0530'} />
        </p>
      </div>
    </div>
  );
}

export default App;
