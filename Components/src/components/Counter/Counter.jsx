import React, { useState } from 'react'

const Counter = (props) => {
  const {
    initialValue = 0,
    step = 6,
    min = 0,
    max = 20,
    onChange = () => {},
  } = props

  // state
  const [count, setCount] = useState(initialValue)
  const [config, setConfig] = useState({ min, max, step })

  console.log(config)

  const onChangeHandler = (value, action) => {
    if (action == 'inc') {
      setCount((pvValue) => {
        const newValue = pvValue + value
        if (newValue <= config.max) {
          return newValue
        }
        return config.max
      })
    }
    if (action === 'dec') {
      setCount((pvValue) => {
        const newValue = pvValue - value
        if (newValue >= config.min) {
          return newValue
        }
        return config.min
      })
    }
  }

  const onResetHandler = () => {
    setCount(initialValue)
  }

  const onConfigChangeHandler = (e) => {
    const { value, name } = e.target

    setConfig((pv) => ({
      ...pv,
      [name]: Number(value),
    }))
  }

  return (
    <div style={{ width: 'auto' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        Min:{' '}
        <input
          type="number"
          name="min"
          value={config.min}
          onChange={onConfigChangeHandler}
        />
        Max:{' '}
        <input
          name="max"
          type="number"
          value={config.max}
          onChange={onConfigChangeHandler}
        />
        Step:{' '}
        <input
          name="step"
          type="number"
          value={config.step}
          onChange={onConfigChangeHandler}
        />
      </div>
      <h1 style={{ fontSize: '100px', margin: 0 }}>{count}</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => onChangeHandler(config.step, 'inc')}
          disabled={count >= config.max}
        >
          Move up
        </button>
        <button
          onClick={() => onChangeHandler(config.step, 'dec')}
          disabled={count <= config.min}
        >
          Move down
        </button>
        <button onClick={onResetHandler}>Reset</button>
      </div>
    </div>
  )
}

export { Counter }
