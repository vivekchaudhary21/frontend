import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { componentLevels } from '../data/componentCatalog'
import { useTheme } from '../context/useTheme'

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

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

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

        <div className="topbar-actions">
          <span className="topbar-progress">26 components</span>
          <button
            className="icon-button theme-toggle-btn"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
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
