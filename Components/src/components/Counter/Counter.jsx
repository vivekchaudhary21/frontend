import React, { useEffect, useState } from 'react'


const clamped = (value, min, max) => Math.min(max, Math.max(min, value))

const Counter = (props) => {
  const {
    initialValue = 0,
    step = 1,
    min = -Infinity,
    max = Infinity,
    onChange = () => { },
  } = props

  // state
  const [count, setCount] = useState(clamped(initialValue, min, max))
  const [config, setConfig] = useState({ min, max, step })


  useEffect(() => {
    onChange(count)
  }, [count, onChange])

  const onChangeHandler = (value, action) => {
    if (action == 'inc') {
      setCount((pvValue) => {
        return clamped(pvValue + value, config.min, config.max)
      })
    }
    if (action === 'dec') {
      setCount((pvValue) => {
        return clamped(pvValue - value, config.min, config.max)
      })
    }
    onChange(value)
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
