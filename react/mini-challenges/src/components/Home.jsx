import React from 'react'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../constants'

export const Home = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <p>Welcome to mini challenges. Click on any component to view.</p>

      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <NavLink to={PATHS.EXPANDING_CARDS}>Expanding Cards</NavLink>
        <NavLink to={PATHS.PROGRESS_STEPS}>Progress Steps</NavLink>
        <NavLink to={PATHS.INFINITE_SCROLL}>Infinite Scroll</NavLink>
        <NavLink to={PATHS.SCROLL_ANIMATION}>Scroll Animation</NavLink>
        <NavLink to={PATHS.DAD_JOKES}>Dad Jokes </NavLink>
        <NavLink to={PATHS.KEY_BOXES}>Key Boxes</NavLink>
        <NavLink to={PATHS.INCREMENT_COUNTER}>Increment Counter</NavLink>
        <NavLink to={PATHS.DRINK_WATER}>Drink Water</NavLink>
        <NavLink to={PATHS.THEME_CLOCK}>Theme Clock</NavLink>
        <NavLink to={PATHS.GUESS_MY_NUMBER}>Guess My Number</NavLink>
      </nav>
    </div>
  )
}
