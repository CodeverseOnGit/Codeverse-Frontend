import { useParams, Link } from 'react-router-dom'
import { sections } from '../data'
import { useState } from 'react'

export default function Module() {
  const { sectionSlug, moduleSlug } = useParams()
  const section = sections.find(s => s.slug === sectionSlug)
  const module = section?.modules.find(m => m.slug === moduleSlug)

  const [openTopic, setOpenTopic] = useState(null)

  const toggleTopic = (slug) => {
    setOpenTopic(openTopic === slug ? null : slug)
  }

  return (
    <div className="container">
      <h1>{module.title}</h1>

      {module.topics.map(topic => (
        <div key={topic.slug}>
          <div
            className="accordion"
            onClick={() => toggleTopic(topic.slug)}
          >
            {topic.title}
          </div>
          <div className={`accordion-content ${openTopic === topic.slug ? 'open' : ''}`}>
            <Link to={`/${sectionSlug}/${moduleSlug}/${topic.slug}`}>
              <div className="card">Go to Topic</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}