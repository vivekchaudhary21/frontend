import { isValidElement } from 'react'
import { Link } from 'react-router-dom'

import { componentRegistry } from '../components'
import { componentLevels } from '../data/componentCatalog'

const allComponents = componentLevels.flatMap((level) => level.components)

export const ComponentPage = ({ component, level }) => {
  const currentIndex = allComponents.findIndex(
    (item) => item.slug === component.slug,
  )
  const previous = allComponents[currentIndex - 1]
  const next = allComponents[currentIndex + 1]
  const preview = componentRegistry[component.slug]

  return (
    <div className="page component-page">
      <header className="component-hero">
        <span className="eyebrow">
          Level {level.number} · {level.title}
        </span>
        <div className="component-title-row">
          <span className="component-index">
            {String(component.number).padStart(2, '0')}
          </span>
          <div>
            <h1>{component.name}</h1>
            <p>{component.focus}</p>
          </div>
        </div>
      </header>

      <section className="workbench" aria-label={`${component.name} workspace`}>
        {preview ? (
          <div
            className="component-preview"
            aria-label={`${component.name} preview`}
          >
            {isValidElement(preview) ? preview : (() => {
              const Component = preview
              return <Component />
            })()}
          </div>
        ) : (
          <div className="empty-preview" aria-label="Empty component preview">
            <span>+</span>
            <strong>Preview area</strong>
            <small>Ready for your implementation</small>
          </div>
        )}
      </section>

      <nav
        className="page-navigation"
        aria-label="Previous and next components"
      >
        {previous ? (
          <Link to={`/components/${previous.slug}`}>
            <small>← Previous</small>
            <strong>{previous.name}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="next-link" to={`/components/${next.slug}`}>
            <small>Next →</small>
            <strong>{next.name}</strong>
          </Link>
        )}
      </nav>
    </div>
  )
}
