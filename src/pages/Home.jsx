import { Link } from 'react-router-dom'
import { sections } from '../data'
import FadeInWrapper from '../components/FadeInWrapper'

export default function Home() {
  return (
    <FadeInWrapper>
      <div className="container">
        <h1>All Sections</h1>
        {sections.map(section => (
          <Link key={section.slug} to={`/${section.slug}`}>
            <div className="card">{section.title}</div>
          </Link>
        ))}
      </div>
    </FadeInWrapper>
  )
}