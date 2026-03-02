import { useParams, useNavigate } from "react-router-dom";
import { sections } from "../data";
import { useState } from "react";

export default function Topic() {
  const { sectionSlug, moduleSlug, topicSlug } = useParams();

  const section = sections.find((s) => s.slug === sectionSlug);
  const module = section?.modules.find((m) => m.slug === moduleSlug);
  const topic = module?.topics.find((t) => t.slug === topicSlug);
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!topic) return <h2>Topic not found</h2>;

  const quiz = topic.quizzes[0];

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };
  const isCorrect = selected === quiz.correctAnswer;

  return (
    <div className="container">
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span> /
        <span onClick={() => navigate(`/${sectionSlug}`)}>
          {" "}
          {section.title}
        </span>{" "}
        /
        <span onClick={() => navigate(`/${sectionSlug}/${moduleSlug}`)}>
          {" "}
          {module.title}
        </span>{" "}
        /{topic.title}
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
              onClick={() => !submitted && setSelected(i)}
              style={{
                background:
                  submitted && i === selected
                    ? i === quiz.correctAnswer
                      ? "#d1fae5"
                      : "#fee2e2"
                    : "",
              }}
            >
              <input type="radio" checked={selected === i} readOnly />{" "}
              {opt.text}
            </div>
          ))}

          {!submitted && <button onClick={handleSubmit}>Submit</button>}

          {submitted && (
            <div style={{ marginTop: "15px" }}>
              <p className={isCorrect ? "correct" : "wrong"}>
                {isCorrect ? "Correct!" : "Incorrect."}
              </p>

              <p style={{ marginTop: "8px", color: "var(--muted)" }}>
                {quiz.options[selected].explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
