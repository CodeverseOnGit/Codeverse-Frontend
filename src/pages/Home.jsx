import { Link } from 'react-router-dom'
import { sections } from '../data'
import FadeInWrapper from '../components/FadeInWrapper'

export default function Home() {
  return (
    <FadeInWrapper>
      <div className="container">
        <div className="hero-section">
          <h1>Welcome to Codeverse</h1>
          <p className="hero-subtitle">Master programming concepts through organized, bite-sized learning modules</p>
        </div>
        
        <div className="sections-grid">
          {sections.map(section => (
            <Link key={section.slug} to={`/${section.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card section-card">
                <div className="card-icon">📚</div>
                <h3>{section.title}</h3>
                <p className="card-subtitle">{section.modules.length} modules</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FadeInWrapper>
  )
}