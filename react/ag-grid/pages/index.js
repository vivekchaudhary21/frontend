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
        <Link href="/columns/column-definations">
          <a>columns/column-definations</a>
        </Link>
        <br />
        <Link href="/columns/updating-column-definations">
          <a>columns/updating-column-definations</a>
        </Link>
        <br />
        <Link href="/columns/save-and-apply-state">
          <a>columns/save-and-apply-state</a>
        </Link>
        <br />
        <Link href="/columns/group">
          <a>columns/group</a>
        </Link>
        <br />
        <Link href="/client-side-data/context">
          <a>client-side-data/context</a>
        </Link>
        <br />
      </div>
    </div>
  )
}
