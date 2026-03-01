import { Link } from 'react-router-dom'
import { sections } from '../data'

export default function Home() {
  return (
    <div className="container">
      <h1>All Sections</h1>

      {sections.map(section => (
        <Link key={section.slug} to={`/${section.slug}`}>
          <div className="card">
            <h2>{section.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}