import { useParams, useNavigate } from "react-router-dom";
import { sections } from "../data";
import { useState } from "react";

export default function Topic() {
  const { sectionSlug, moduleSlug, topicSlug } = useParams();
  const navigate = useNavigate();

  // Find current section, module, topic
  const section = sections.find((s) => s.slug === sectionSlug);
  const module = section?.modules.find((m) => m.slug === moduleSlug);
  const topic = module?.topics.find((t) => t.slug === topicSlug);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});

  if (!topic) return <h2 style={{ padding: "20px" }}>Topic not found</h2>;

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="content-paragraph">
            {block.text}
          </p>
        );
      case "heading":
        return (
          <h2 key={index} className="content-heading">
            {block.text}
          </h2>
        );

      case "image":
        return (
          <img
            key={index}
            src={block.src}
            alt={block.alt}
            className="content-image"
          />
        );

      case "code":
        return (
          <pre key={index} className="content-code">
            <code>{block.code}</code>
          </pre>
        );

      default:
        return null;
    }
  };
  return (
    <div className="container">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span> /{" "}
        <span onClick={() => navigate(`/${sectionSlug}`)}>{section.title}</span>{" "}
        /{" "}
        <span onClick={() => navigate(`/${sectionSlug}/${moduleSlug}`)}>
          {module.title}
        </span>{" "}
        / {topic.title}
      </div>

      <h1>{topic.title}</h1>

      {/* Topic content */}
      <div className="topic-content">
        {topic.content.map((block, i) => renderBlock(block, i))}
      </div>

      {/* Quizzes */}
      {topic.quizzes.length > 0 ? (
        topic.quizzes.map((quiz, qIndex) => {
          const selected = selectedAnswers[qIndex];
          const isSubmitted = submitted[qIndex];
          const isCorrect = selected === quiz.correctAnswer;

          return (
            <div key={qIndex} className="quiz-box">
              <h3>
                Question {qIndex + 1}: {quiz.question}
              </h3>

              {/* Render code in question if exists */}
              {quiz.questionCode && (
                <pre className="content-code">
                  <code>{quiz.questionCode.code}</code>
                </pre>
              )}

              {quiz.options.map((opt, i) => (
                <div
                  key={i}
                  className="quiz-option"
                  onClick={() => {
                    if (!isSubmitted) {
                      setSelectedAnswers((prev) => ({
                        ...prev,
                        [qIndex]: i,
                      }));
                    }
                  }}
                  style={{
                    background:
                      isSubmitted && i === selected
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

              {!isSubmitted && (
                <button
                  onClick={() => {
                    if (selected === undefined) return;
                    setSubmitted((prev) => ({
                      ...prev,
                      [qIndex]: true,
                    }));
                  }}
                >
                  Submit
                </button>
              )}

              {isSubmitted && (
                <div style={{ marginTop: "10px" }}>
                  <p className={isCorrect ? "correct" : "wrong"}>
                    {isCorrect ? "Correct!" : "Incorrect."}
                  </p>
                  <p style={{ color: "var(--muted)" }}>
                    {quiz.options[selected]?.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No quizzes available for this topic.</p>
      )}
    </div>
  );
}
