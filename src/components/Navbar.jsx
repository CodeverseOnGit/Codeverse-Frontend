import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (prefersDark) {
      setIsDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    
    if (newTheme === 'light') {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <div className="navbar">
        Codeverse
        <button
          className="theme-toggle"
          onClick={(e) => {
            e.preventDefault()
            toggleTheme()
          }}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </Link>
  )
}