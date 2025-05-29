import React, { useEffect, useState } from 'react';
import styles from './QuestionBox.module.css';
import { useNavigate } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';

const prizeLevels = [
  1000, 2000, 3000, 4000, 5000,
  8000, 12000, 20000, 32000, 50000,
  75000, 125000, 250000, 500000, 1000000
];

const safeHavens = {
  4: 1000,
  8: 32000,
  14: 1000000
};

const QuestionsPage = () => {
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
      const res = await fetch("https://quiz.vichconsulting.dk/api/game");
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
  },[]);

  const navigate = useNavigate();

const handleAnswer = (key) => {
  setSelected(key);
  const correct = question.options[key].correct;

  setTimeout(() => {
    if (correct) {
      if (questionId < questions.length - 1) {
        setQuestionId((prev) => prev + 1);
      } else {
        const finalPrize = prizeLevels[questionId];
        navigate('/winner', { state: { amount: finalPrize } });
      }
    } else {
      let safeAmount = 0;
      for (let i = questionId - 1; i >= 0; i--) {
        if (safeHavens[i + 1]) {
          safeAmount = prizeLevels[i + 1];
          break;
        }
      }
      navigate('/loser', { state: { amount : safeAmount } });
    }
  });
};


  if (!question) return <div>Indlæser spørgsmål...</div>;

  return (
    <div className={styles.container}>
      <img src={hvvmLogo} className="logo" alt="Hvvm logo" />
      <h1>Who Wants to Be a Millionaire</h1>
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
    <div className={`prize-counter ${safeHavens[questionId] ? 'safe-haven' : ''}`}>
  {prizeLevels[questionId].toLocaleString()} kr.
    </div>
    </div>
  );
};

export default QuestionsPage;
