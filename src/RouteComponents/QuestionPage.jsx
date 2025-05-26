import React, { useEffect, useState } from 'react';
import styles from './QuestionBox.module.css';

const QuestionPage = () => {
   const [questionId, setQuestionId] = useState(0); // Bruger index i stedet for ID
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);

  // 👉 Transformer ét spørgsmål
  const transformQuestion = (q) => {
    const optionsObj = {};
    q.options.forEach((opt) => {
      const key = opt.answerText.split(":")[0]; // "A", "B" osv.
      optionsObj[key] = {
        text: opt.answerText,
        correct: opt.correct,
      };
    });

    return {
      text: q.question,
      difficulty: q.difficultyType,
      options: optionsObj,
    };
  };

  // 👉 Hent alle spørgsmål én gang
  const fetchAllQuestions = async () => {
    try {
      const res = await fetch("/api/game");
      if (!res.ok) throw new Error("Kunne ikke hente spørgsmål");
      const data = await res.json();
      setQuestions(data.map(transformQuestion));
    } catch (err) {
      console.error("Fejl ved hentning:", err);
    }
  };

  // 👉 Når listen hentes eller spørgsmålId ændres
  useEffect(() => {
    if (questions.length > 0) {
      setQuestion(questions[questionId]);
      setSelected(null);
    }
  }, [questions, questionId]);

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const handleAnswer = (key) => {
    setSelected(key);
    const correct = question.options[key].correct;

    setTimeout(() => {
      if (correct) {
        if (questionId < questions.length - 1) {
          setQuestionId((prev) => prev + 1);
        } else {
          alert("Du har gennemført quizzen!");
        }
      } else {
        alert("Forkert svar! Prøv igen.");
      }
    }, 1000);
  };

  if (!question) return <div>Indlæser spørgsmål...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>Who Wants to Be a Millionaire</h1>
      <div className={styles.questionBox}>{question.text}</div>

      <div className={styles.answers}>
        {["A", "B", "C", "D"].map((key) => (
          <button
            key={key}
            onClick={() => handleAnswer(key)}
            className={`${styles.answerButton} ${
              selected === key
                ? question.options[key].correct
                  ? styles.correct
                  : styles.incorrect
                : ""
            }`}
            disabled={!!selected}
          >
            {question.options[key].text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
