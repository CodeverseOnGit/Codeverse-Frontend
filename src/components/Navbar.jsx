import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <div className="navbar">
        Codeverse
      </div>
    </Link>
  )
}