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

      {section.modules.map(module => (
        <Link
          key={module.slug}
          to={`/${section.slug}/${module.slug}`}
        >
          <div className="card">
            <h3>{module.title}</h3>
            <p style={{ color: "var(--muted)", marginTop: "5px" }}>
              {module.topics.length} topics
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}