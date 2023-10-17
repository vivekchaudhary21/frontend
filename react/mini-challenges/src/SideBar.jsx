import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from './paths'

const SideBar = () => {
  return (
    <div>
      <Link to={PATHS.HOME}>Home</Link>
      <Link to={PATHS.EXPANDING_CARDS}>Expanding Cards</Link>
      <Link to={PATHS.PROGRESS_STEPS}>Progress Steps</Link>
      <Link to={PATHS.INFINITE_SCROLL}>Infinite Scroll</Link>
      <Link to={PATHS.SCROLL_ANIMATION}>Scroll Animation</Link>
    </div>
  )
}

export default SideBar
