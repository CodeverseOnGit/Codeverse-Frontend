import { useParams, Link } from 'react-router-dom'
import { sections } from '../data'

export default function Module() {
  const { sectionSlug, moduleSlug } = useParams()
  const section = sections.find(s => s.slug === sectionSlug)
  const module = section?.modules.find(m => m.slug === moduleSlug)

  if (!module) return <h2>Module not found</h2>

  return (
    <div>
      <h1>{module.title}</h1>

      {module.topics.map(topic => (
        <div key={topic.slug}>
          <Link to={`/${sectionSlug}/${moduleSlug}/${topic.slug}`}>
            <h4>{topic.title}</h4>
          </Link>
        </div>
      ))}
    </div>
  )
}