import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const defaultElpasedTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
  months: '00',
  years: '00',
};

const getElpasedTime = (countdown) => {
  const todaysDate = dayjs(new Date());
  const earlierDate = dayjs(countdown);
  const getSeconds = todaysDate.diff(earlierDate, 'second') % 60;
  const getMinutes = todaysDate.diff(earlierDate, 'minute') % 60;
  const getHours = todaysDate.diff(earlierDate, 'hour') % 24;
  const getDays = todaysDate.diff(earlierDate, 'day') % 365;
  const getMonths = todaysDate.diff(earlierDate, 'month') % 12;
  const getYears = todaysDate.diff(earlierDate, 'year');

  return {
    seconds: getSeconds,
    minutes: getMinutes,
    hours: getHours,
    days: getDays,
    months: getMonths,
    years: getYears,
  };
};

const Countdown = ({ timestamp }) => {
  const [elapsedTime, setElapsedTime] = useState(defaultElpasedTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(getElpasedTime(timestamp));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  console.log(elapsedTime);

  return (
    <>
      {elapsedTime.years > 0 && (
        <>
          <span>{elapsedTime.years} </span>
          <span>years </span>
        </>
      )}
      {elapsedTime.months > 0 && (
        <>
          <span>{elapsedTime.months} </span>
          <span>months </span>
        </>
      )}
      {elapsedTime.days > 0 && (
        <>
          <span>{elapsedTime.days} </span>
          <span>days </span>
        </>
      )}
      {elapsedTime.hours > 0 && (
        <>
          <span>{elapsedTime.hours} </span>
          <span>hours </span>
        </>
      )}
      {elapsedTime.minutes > 0 && (
        <>
          <span>{elapsedTime.minutes} </span>
          <span>minutes </span>
        </>
      )}
      {/* {elapsedTime.seconds > 0 && (
        <>
          <span>{elapsedTime.seconds} </span>
          <span>seconds </span>
        </>
      )} */}

      {elapsedTime.minutes > 0 && <span>ago</span>}
    </>
  );
};

export default Countdown;
