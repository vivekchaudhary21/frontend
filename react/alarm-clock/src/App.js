import React, { useEffect, useState, useRef } from 'react';

import './App.css';
import { TIME_CONSTANT } from './constants';
import { GetOptions, getCurrentTime } from './utils';

const initialAlarmState = {
  Hour: 'Hour',
  Minute: 'Minute',
  'AM/PM': 'AM/PM',
};

function App() {
  const intervalIdRef = useRef(null);
  const [time, setTime] = useState(() =>
    getCurrentTime(new Date().toLocaleTimeString())
  );
  const [alarm, setAlarm] = useState(initialAlarmState);
  const [toggleAlarm, setToggleAlarm] = useState(false);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setTime(getCurrentTime(new Date().toLocaleTimeString()));
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (toggleAlarm) {
      const [hour, minute, mode] = Object.values(alarm);
      const finalAlarm = `${hour}:${minute}:00 ${mode}`;
      console.log(finalAlarm);
      if (finalAlarm === time) {
        setTimeout(() => {
          alert('Alarm');
          window.location.reload();
        }, 500);
      }
    }
  }, [time]);

  const handleChange = (e, name) => {
    const { value } = e.target;
    setAlarm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const alarmHandler = () => {
    setToggleAlarm(!toggleAlarm);
    if (toggleAlarm) {
      window.location.reload();
    }
  };

  return (
    <div className='Container'>
      <div className='App'>
        <h1>Alarm Clock</h1>
        <img src={process.env.PUBLIC_URL + '/assets/clock.svg'} alt='Alarm' />
        <h3>{time}</h3>
        <div className='Alarm'>
          <select onChange={(e) => handleChange(e, TIME_CONSTANT.HOUR)}>
            <GetOptions title={TIME_CONSTANT.HOUR} count={12} alarm={alarm} />
          </select>
          <select onChange={(e) => handleChange(e, TIME_CONSTANT.MINUTE)}>
            <GetOptions title={TIME_CONSTANT.MINUTE} count={60} alarm={alarm} />
          </select>
          <select onChange={(e) => handleChange(e, TIME_CONSTANT.AMPM)}>
            <GetOptions title={TIME_CONSTANT.AMPM} alarm={alarm} />
          </select>
        </div>
        <button onClick={alarmHandler}>
          {toggleAlarm ? 'Cancel Alarm' : 'Set Alarm'}
        </button>
      </div>
    </div>
  );
}

export default App;
