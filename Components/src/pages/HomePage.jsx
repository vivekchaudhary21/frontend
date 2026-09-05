import { Link } from 'react-router-dom'

import { componentCount, componentLevels } from '../data/componentCatalog'

export const HomePage = () => (
  <div className="page home-page">
    <section className="hero">
      <span className="eyebrow">React learning roadmap</span>
      <h1>Build components.<br />Master the patterns.</h1>
      <p>
        A focused collection of reusable React components for deliberate practice,
        accessibility learning, and frontend interview preparation.
      </p>
      <div className="hero-actions">
        <Link className="primary-button" to="/components/counter">Start with Counter</Link>
        <span>{componentCount} projects · 4 levels</span>
      </div>
    </section>

    <section className="levels" aria-labelledby="roadmap-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">The roadmap</span>
          <h2 id="roadmap-heading">Learn one layer at a time</h2>
        </div>
        <span className="progress-pill">0 / {componentCount} complete</span>
      </div>

      <div className="level-grid">
        {componentLevels.map((level) => (
          <article className="level-card" key={level.id}>
            <span className="level-number">0{level.number}</span>
            <h3>{level.title}</h3>
            <p>{level.description}</p>
            <ul>
              {level.components.map((component) => (
                <li key={component.slug}>
                  <Link to={`/components/${component.slug}`}>
                    <span>{String(component.number).padStart(2, '0')}</span>
                    {component.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  </div>
)
