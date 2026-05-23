import { useParams, Link } from 'react-router-dom'
import { sections } from '../data'

export default function Section() {
  const { sectionSlug } = useParams()
  const section = sections.find(s => s.slug === sectionSlug)

  if (!section) {
    return (
      <div className="container">
        <h2>Section not found</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>{section.title}</h1>

      {section.modules.length === 0 && (
        <p>No modules added yet.</p>
      )}

      <div className="modules-grid">
        {section.modules.map(module => (
          <Link
            key={module.slug}
            to={`/${section.slug}/${module.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="card module-card">
              <div className="card-icon">📖</div>
              <h3>{module.title}</h3>
              <p className="card-subtitle">
                {module.topics.length} topic{module.topics.length !== 1 ? 's' : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}