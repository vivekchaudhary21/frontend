import React, { useEffect, useState } from 'react'
import styles from './themeclock.module.css'

const getTime = () => {
  const time = new Date()
  const month = time.getMonth()
  const day = time.getDay()
  const date = time.getDate()
  const hours = time.getHours()
  const hoursForClock = hours >= 13 ? hours % 12 : hours
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

  return {
    time: `${hoursForClock}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds} ${ampm}`,
    day: `${days[day]}, ${months[month]}`,
    date,
    hours: {
      transform: `translate(-50%, -100%) rotate(${scale(
        hoursForClock,
        0,
        12,
        0,
        360
      )}deg)`,
    },
    minutes: {
      transform: `translate(-50%, -100%) rotate(${scale(
        minutes,
        0,
        60,
        0,
        360
      )}deg)`,
    },
    seconds: {
      transform: `translate(-50%, -100%) rotate(${scale(
        seconds,
        0,
        60,
        0,
        360
      )}deg)`,
    },
  }
}

const ThemeClock = () => {
  const [watch, setWatch] = useState(getTime().time)
  const { hours, minutes, seconds, day, date } = getTime()

  useEffect(() => {
    const timeIntervalID = setInterval(() => {
      const { time } = getTime()
      setWatch(time)
    }, 0)

    return () => {
      clearInterval(timeIntervalID)
    }
  }, [])

  return (
    <div className={styles.container}>
      <button className={styles.toggle}>Watch</button>

      <div className={styles.clockContainer}>
        <div className={styles.clock}>
          <div
            className={`${styles.needle} ${styles.hour}`}
            style={hours}
          ></div>
          <div
            className={`${styles.needle} ${styles.minute}`}
            style={minutes}
          ></div>
          <div
            className={`${styles.needle} ${styles.second}`}
            style={seconds}
          ></div>
          <div className={styles.centerPoint}></div>
        </div>

        <div className={styles.time}>{watch}</div>
        <div className={styles.date}>
          {day} <span className="circle">{date}</span>
        </div>
      </div>
    </div>
  )
}

export { ThemeClock }
