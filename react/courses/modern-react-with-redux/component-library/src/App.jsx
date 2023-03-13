import React, { useState } from 'react'
import classNames from 'classnames'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((c) => c + 1)
  }

  const handleDecrement = () => {
    setCount((c) => c - 1)
  }

  return (
    <div>
      <h1>Component Library</h1>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
      <Button success>Success</Button>
      <Button warning>Warning</Button>
      <Button danger>Danger</Button>
      <Button primary outline>
        Primary Outline
      </Button>
      <Button primary rounded className="mx-5 px-5">
        Primary Rounded
      </Button>
      <Button primary rounded outline>
        Primary Rounded Outline
      </Button>
      <div style={{ paddingTop: '5px' }}>
        <Button className="m-5 px-5" primary onClick={handleIncrement}>
          Increment
        </Button>
        <Button className="m-5 px-5" primary rounded outline>
          {count}
        </Button>
        <Button primary onClick={handleDecrement}>
          Decrement
        </Button>
      </div>
    </div>
  )
}

export default App

function Button(props) {
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    className,
    ...rest
  } = props

  const classes = classNames('px-3 py-1.5 border', className, {
    'border-blue-600 bg-blue-500 text-white': primary,
    'border-gray-600 bg-gray-500 text-white': secondary,
    'border-green-600 bg-green-500 text-white': success,
    'border-yellow-600 bg-yellow-500 text-white': warning,
    'border-red-600 bg-red-500 text-white': danger,
    'bg-white text-blue-500': outline && primary,
    'bg-white text-gray-500': outline && secondary,
    'bg-white text-green-500': outline && success,
    'bg-white text-red-500': outline && danger,
    'bg-white text-yellow-500': outline && warning,
    'rounded-full': rounded,
  })
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}
