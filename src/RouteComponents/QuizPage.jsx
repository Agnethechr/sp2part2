import { useEffect, useState } from "react";
import WinnerPage from "./WinnerPage";
import LoserPage from "./LoserPage";

// Præmiesummer og sikkerhedsbeløb
const prizeLevels = [
  "1.000 kr", "2.000 kr", "3.000 kr", "4.000 kr", "5.000 kr",
  "8.000 kr", "12.000 kr", "20.000 kr", "32.000 kr", "50.000 kr",
  "75.000 kr", "125.000 kr", "250.000 kr", "500.000 kr", "1.000.000 kr"
];

const safeHavens = {
  4: "1.000 kr",
  9: "32.000 kr",
  14: "1.000.000 kr",
};

// Manuelt svarbibliotek
const answerBank = {
  1: {
    options: [
      { answerText: "København", correct: true },
      { answerText: "Aarhus", correct: false },
      { answerText: "Odense", correct: false },
      { answerText: "Aalborg", correct: false },
    ],
  },
  2: {
    options: [
      { answerText: "Kat", correct: false },
      { answerText: "Ko", correct: true },
      { answerText: "Hund", correct: false },
      { answerText: "Hest", correct: false },
    ],
  },
  3: {
    options: [
      { answerText: "15", correct: true },
      { answerText: "14", correct: false },
      { answerText: "16", correct: false },
      { answerText: "13", correct: false },
    ],
  },
  4: {
    options: [
      { answerText: "7", correct: true },
      { answerText: "5", correct: false },
      { answerText: "6", correct: false },
      { answerText: "8", correct: false },
    ],
  },
  5: {
    options: [
      { answerText: "Ottawa", correct: true },
      { answerText: "Toronto", correct: false },
      { answerText: "Vancouver", correct: false },
      { answerText: "Montreal", correct: false },
    ],
  },
  6: {
    options: [
      { answerText: "Hydrogen", correct: true },
      { answerText: "Oxygen", correct: false },
      { answerText: "Carbon", correct: false },
      { answerText: "Helium", correct: false },
    ],
  },
  7: {
    options: [
      { answerText: "Merkur", correct: true },
      { answerText: "Venus", correct: false },
      { answerText: "Jorden", correct: false },
      { answerText: "Mars", correct: false },
    ],
  },
  8: {
    options: [
      { answerText: "William Shakespeare", correct: true },
      { answerText: "Charles Dickens", correct: false },
      { answerText: "Jane Austen", correct: false },
      { answerText: "Mark Twain", correct: false },
    ],
  },
  9: {
    options: [
      { answerText: "Au", correct: true },
      { answerText: "Ag", correct: false },
      { answerText: "Fe", correct: false },
      { answerText: "Pb", correct: false },
    ],
  },
  10: {
    options: [
      { answerText: "Leonardo da Vinci", correct: true },
      { answerText: "Michelangelo", correct: false },
      { answerText: "Picasso", correct: false },
      { answerText: "Van Gogh", correct: false },
    ],
  },
  11: {
    options: [
      { answerText: "Kina", correct: true },
      { answerText: "Indien", correct: false },
      { answerText: "USA", correct: false },
      { answerText: "Indonesien", correct: false },
    ],
  },
  12: {
    options: [
      { answerText: "12", correct: true },
      { answerText: "10", correct: false },
      { answerText: "11", correct: false },
      { answerText: "13", correct: false },
    ],
  },
  13: {
    options: [
      { answerText: "1939", correct: true },
      { answerText: "1940", correct: false },
      { answerText: "1938", correct: false },
      { answerText: "1941", correct: false },
    ],
  },
  14: {
    options: [
      { answerText: "Albert Einstein", correct: true },
      { answerText: "Isaac Newton", correct: false },
      { answerText: "Niels Bohr", correct: false },
      { answerText: "Stephen Hawking", correct: false },
    ],
  },
  15: {
    options: [
      { answerText: "Leo Tolstoj", correct: true },
      { answerText: "Dostojevskij", correct: false },
      { answerText: "Kafka", correct: false },
      { answerText: "Goethe", correct: false },
    ],
  },
};

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [earnedMoney, setEarnedMoney] = useState("0 kr");
  const [safeMoney, setSafeMoney] = useState("0 kr");

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("millionaireGame"));
    if (savedState) {
      setCurrentIndex(savedState.currentIndex);
      setEarnedMoney(savedState.earnedMoney);
      setSafeMoney(savedState.safeMoney);
      setQuizFinished(savedState.quizFinished);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "millionaireGame",
      JSON.stringify({
        currentIndex,
        earnedMoney,
        safeMoney,
        quizFinished,
      })
    );
  }, [currentIndex, earnedMoney, safeMoney, quizFinished]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("https://quiz.vichconsulting.dk/api/game");
        if (!res.ok) throw new Error("Netværksfejl");
        const data = await res.json();
        console.log("Fetched questions:", data); 

        const updatedData = data.slice(0, 15).map(q => ({
          ...q,
          options: answerBank[q.id]?.options || [],
        }));

        setQuestions(updatedData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchQuestions();
  }, []);

  if (questions.length === 0 || questions.some(q => q.options.length === 0)) {
    return <p>Indlæser spørgsmål...</p>;
  }

  const question = questions[currentIndex];

  function handleAnswer(index) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (question.options[index].correct) {
      setFeedback("✅ Korrekt!");
      setEarnedMoney(prizeLevels[currentIndex]);
      if (safeHavens[currentIndex]) {
        setSafeMoney(safeHavens[currentIndex]);
      }
    } else {
      setFeedback("❌ Forkert!");
      setEarnedMoney(safeMoney);
    }
  }

  function nextQuestion() {
    if (feedback === "✅ Korrekt!") {
      if (currentIndex === questions.length - 1) {
        setQuizFinished(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setFeedback("");
      }
    } else {
      setQuizFinished(true);
    }
  }

  if (quizFinished) {
  const isWinner = currentIndex === questions.length - 1 && feedback === "✅ Korrekt!";
  return isWinner ? (
    <WinnerPage earnedMoney={earnedMoney} onRestart={restartQuiz} />
  ) : (
    <LoserPage safeMoney={safeMoney} onRestart={restartQuiz} />
  );
}

function restartQuiz() {
  localStorage.removeItem("millionaireGame");
  setQuizFinished(false);
  setCurrentIndex(0);
  setEarnedMoney("0 kr");
  setSafeMoney("0 kr");
  setSelectedAnswer(null);
  setFeedback("");
}


  return (
    <div className="quiz-container">
      <header>
        <img src="/hvvmLogo.png" alt="HVVM logo" className="logo" />
        <h1>Hvem vil være millionær?</h1>
        <p>Spørgsmål {currentIndex + 1} / {questions.length}</p>
      </header>

      <div className="content">
        <section className="question-section">
          <h2>{question.question}</h2>
          <div className="options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={
                  selectedAnswer === i
                    ? opt.correct ? "correct" : "incorrect"
                    : ""
                }
              >
                {opt.answerText}
              </button>
            ))}
          </div>
          {feedback && <p className="feedback">{feedback}</p>}
          <button
            onClick={nextQuestion}
            disabled={selectedAnswer === null}
            className="next-btn"
          >
            Næste spørgsmål
          </button>
        </section>

        <aside className="prize-sidebar">
          <ul>
            {prizeLevels.map((amount, i) => (
              <li
                key={i}
                className={
                  i === currentIndex
                    ? "current"
                    : i < currentIndex
                    ? "passed"
                    : ""
                }
              >
                {i + 1}. {amount} {safeHavens[i] ? "★" : ""}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default QuizPage;
