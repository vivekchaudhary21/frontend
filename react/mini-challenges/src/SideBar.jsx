import React from 'react'
import { PATHS } from './paths'

const SideBar = () => {
  return (
    <div>
      <a href={PATHS.HOME}>Home</a>
      <a href={PATHS.EXPANDING_CARDS}>Expanding Cards</a>
    </div>
  )
}

export default SideBar
