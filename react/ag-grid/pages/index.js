import React from 'react'
import Link from 'next/link'

export default () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        Welcome to AG GRID Tutorials. <br />
        Paths available: <br />
        <Link href="/">
          <a>/</a>
        </Link>
        <br />
        <Link href="/getting-started">
          <a>getting-started</a>
        </Link>
        <br />
        <Link href="/getting-started/hooks">
          <a>getting-started/hooks</a>
        </Link>
        <br />
        <Link href="/interface-api/grid-interface">
          <a>interface-api/grid-interface</a>
        </Link>
        <br />
        <Link href="/interface-api/column-interface">
          <a>interface-api/column-interface</a>
        </Link>
        <br />
      </div>
    </div>
  )
}
