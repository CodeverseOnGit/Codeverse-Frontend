import { useParams, useNavigate } from 'react-router-dom'
import { sections } from '../data'
import { useState } from 'react'

export default function Topic() {
  const { sectionSlug, moduleSlug, topicSlug } = useParams()

  const section = sections.find(s => s.slug === sectionSlug)
  const module = section?.modules.find(m => m.slug === moduleSlug)
  const topic = module?.topics.find(t => t.slug === topicSlug)
  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)

  if (!topic) return <h2>Topic not found</h2>

  const quiz = topic.quizzes[0]

  const handleSubmit = () => {
    if (selected === quiz.correctAnswer) {
      setResult("Correct!")
    } else {
      setResult("Wrong answer.")
    }
  }

  return (
      <div className="container">

    <div className="breadcrumb">
      <span onClick={() => navigate("/")}>Home</span> / 
      <span onClick={() => navigate(`/${sectionSlug}`)}> {section.title}</span> / 
      <span onClick={() => navigate(`/${sectionSlug}/${moduleSlug}`)}> {module.title}</span> / 
      {topic.title}
    </div>
      <h1>{topic.title}</h1>

<div className="topic-content">
  <div dangerouslySetInnerHTML={{ __html: topic.content }} />
</div>
      {quiz && (
        <div className="quiz-box">
  <h3>{quiz.question}</h3>

  {quiz.options.map((opt, i) => (
    <div
          key={i}
          className="quiz-option"
          onClick={() => setSelected(i)}
        >
          <input
            type="radio"
            checked={selected === i}
            readOnly
          /> {opt}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>

      {result && (
        <p className={result === "Correct!" ? "correct" : "wrong"}>
          {result}
        </p>
      )}
    </div>
      )}
    </div>
  )
}