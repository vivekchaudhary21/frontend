import React from 'react'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../paths'

const SideBar = () => {
  return (
    <nav>
      <NavLink to={PATHS.HOME}>Home</NavLink>
      <NavLink to={PATHS.EXPANDING_CARDS}>Expanding Cards</NavLink>
      <NavLink to={PATHS.PROGRESS_STEPS}>Progress Steps</NavLink>
      <NavLink to={PATHS.INFINITE_SCROLL}>Infinite Scroll</NavLink>
      <NavLink to={PATHS.SCROLL_ANIMATION}>Scroll Animation</NavLink>
      <NavLink to={PATHS.DAD_JOKES}>Dad Jokes </NavLink>
    </nav>
  )
}

export default SideBar
