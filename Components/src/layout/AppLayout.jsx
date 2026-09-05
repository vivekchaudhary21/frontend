import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { componentLevels } from '../data/componentCatalog'

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isDrawerOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsDrawerOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isDrawerOpen])

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="icon-button menu-button"
          type="button"
          aria-label="Open component navigation"
          aria-controls="component-drawer"
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </button>

        <NavLink className="brand" to="/">
          <span className="brand-mark">RC</span>
          <span>
            <strong>React Components</strong>
            <small>Interview practice lab</small>
          </span>
        </NavLink>

        <span className="topbar-progress">26 components</span>
      </header>

      <button
        className={`drawer-backdrop ${isDrawerOpen ? 'is-visible' : ''}`}
        type="button"
        aria-label="Close component navigation"
        tabIndex={isDrawerOpen ? 0 : -1}
        onClick={() => setIsDrawerOpen(false)}
      />

      <aside
        id="component-drawer"
        className={`drawer ${isDrawerOpen ? 'is-open' : ''}`}
        aria-label="Component navigation"
        aria-hidden={!isDrawerOpen}
        inert={!isDrawerOpen}
      >
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Learning path</span>
            <h2>Components</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Close component navigation"
            onClick={() => setIsDrawerOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="drawer-nav">
          <NavLink className={({ isActive }) => `drawer-home ${isActive ? 'active' : ''}`} to="/" end>
            <span className="nav-number">⌂</span>
            Overview
          </NavLink>

          {componentLevels.map((level) => (
            <section className="nav-level" key={level.id}>
              <p>Level {level.number} · {level.title}</p>
              {level.components.map((component) => (
                <NavLink
                  key={component.slug}
                  to={`/components/${component.slug}`}
                  className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-number">{String(component.number).padStart(2, '0')}</span>
                  <span>{component.name}</span>
                </NavLink>
              ))}
            </section>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
