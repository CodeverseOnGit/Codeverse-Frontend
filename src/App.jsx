import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Section from './pages/Section'
import Module from './pages/Module'
import Topic from './pages/Topic'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:sectionSlug" element={<Section />} />
        <Route path="/:sectionSlug/:moduleSlug" element={<Module />} />
        <Route path="/:sectionSlug/:moduleSlug/:topicSlug" element={<Topic />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App