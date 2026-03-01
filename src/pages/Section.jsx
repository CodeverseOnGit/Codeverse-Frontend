import { useParams, Link } from 'react-router-dom'
import { sections } from '../data'

export default function Section() {
  const { sectionSlug } = useParams()
  const section = sections.find(s => s.slug === sectionSlug)

  if (!section) return <h2>Section not found</h2>

  return (
    <div>
      <h1>{section.title}</h1>

      {section.modules.map(module => (
        <div key={module.slug}>
          <Link to={`/${section.slug}/${module.slug}`}>
            <h3>{module.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  )
}