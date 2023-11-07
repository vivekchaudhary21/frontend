import React, { useEffect, useState } from 'react'
import styles from './keyboxes.module.css'

export const KeyBoxes = () => {
  const [keyCode, setKeyCode] = useState({
    key: null,
    keyCode: null,
    code: null,
  })

  useEffect(() => {
    window.addEventListener('keypress', ({ key, keyCode, code }) => {
      setKeyCode({ key, keyCode, code })
    })
  }, [])

  return (
    <div className="main-container">
      <div id="insert">
        {keyCode.key ? (
          <>
            <div className={styles.key}>
              {keyCode.key === ' ' ? 'Space' : keyCode.key}
              <small>Key</small>
            </div>

            <div className={styles.key}>
              {keyCode.keyCode === ' ' ? 'Space' : keyCode.keyCode}
              <small>Key Code</small>
            </div>

            <div className={styles.key}>
              {keyCode.code === ' ' ? 'Space' : keyCode.code}
              <small>Code</small>
            </div>
          </>
        ) : (
          <div className={styles.key}>Press any key to get the keyCode</div>
        )}
      </div>
    </div>
  )
}
