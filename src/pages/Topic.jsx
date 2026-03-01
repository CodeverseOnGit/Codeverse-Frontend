import { useParams } from 'react-router-dom'
import { sections } from '../data'
import { useState } from 'react'

export default function Topic() {
  const { sectionSlug, moduleSlug, topicSlug } = useParams()

  const section = sections.find(s => s.slug === sectionSlug)
  const module = section?.modules.find(m => m.slug === moduleSlug)
  const topic = module?.topics.find(t => t.slug === topicSlug)

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
    <div>
      <h1>{topic.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: topic.content }} />

      {quiz && (
        <div>
          <h3>{quiz.question}</h3>
          {quiz.options.map((opt, i) => (
            <div key={i}>
              <input
                type="radio"
                name="quiz"
                onChange={() => setSelected(i)}
              />
              {opt}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
          {result && <p>{result}</p>}
        </div>
      )}
    </div>
  )
}