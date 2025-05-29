
import { useEffect, useState } from "react";

//De forskellige pengesumme brugeren kan vinde.
const prizeLevels = [
  "1.000 kr", "2.000 kr", "3.000 kr", "4.000 kr", "5.000 kr",
  "8.000 kr", "12.000 kr", "20.000 kr", "32.000 kr", "50.000 kr",
  "75.000 kr", "125.000 kr", "250.000 kr", "500.000 kr", "1.000.000 kr"
];

//De tre safehavens hvis brugeren svarer forkert efter et af de tre, runder den ned og de vinder nærmeste.
const safeHavens = {
  4: "1.000 kr",      // Spørgsmål 5
  9: "32.000 kr",     // Spørgsmål 10
  14: "1.000.000 kr", // Spørgsmål 15
};

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [earnedMoney, setEarnedMoney] = useState("0 kr");
  const [safeMoney, setSafeMoney] = useState("0 kr");

  // Load state fra localStorage ved mount
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("millionaireGame"));
    if (savedState) {
      setCurrentIndex(savedState.currentIndex);
      setEarnedMoney(savedState.earnedMoney);
      setSafeMoney(savedState.safeMoney);
      setQuizFinished(savedState.quizFinished);
    }
  }, []);

  // Gem state til localStorage ved ændringer
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

  //Henter vores backend udfra vores API.
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("https://quiz.vichconsulting.dk/api/quiz");
        if (!res.ok) throw new Error("Netværksfejl");
        const data = await res.json();
        setQuestions(data.slice(0, 15));
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestions();
  }, []);

  if (questions.length === 0) return <p>Indlæser spørgsmål...</p>;

  if (quizFinished) {
    return (
      <div className="quiz-container finished">
        <h1>Quiz færdig!</h1>
        <p>Du har tjent: <strong>{earnedMoney}</strong></p>
        <p>Sikret gevinst: <strong>{safeMoney}</strong></p>
        <button onClick={() => {
          localStorage.removeItem("millionaireGame");
          setQuizFinished(false);
          setCurrentIndex(0);
          setEarnedMoney("0 kr");
          setSafeMoney("0 kr");
          setSelectedAnswer(null);
          setFeedback("");
        }}>Prøv igen</button>
      </div>
    );
  }

  const question = questions[currentIndex];

  function handleAnswer(index) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (question.options[index].correct) {
      setFeedback("✅ Korrekt!");
      setEarnedMoney(prizeLevels[currentIndex]);

      // Opdater safe money, hvis aktuelt spørgsmål er safe haven
      if (safeHavens[currentIndex]) {
        setSafeMoney(safeHavens[currentIndex]);
      }
    } else {
      setFeedback("❌ Forkert!");

      // Ved forkert svar, vis det sikre beløb som tjent
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
      // Forkert svar = afslut quiz
      setQuizFinished(true);
    }
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
                  i === currentIndex ? "current" : 
                  i < currentIndex ? "passed" : ""
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
