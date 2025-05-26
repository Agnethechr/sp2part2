import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';
import './App.css';

import MainPage from './RouteComponents/MainPage';
import VisionPage from './RouteComponents/VisionPage';
import EndpointsPage from './RouteComponents/EndpointsPage';
import QuizPage from './RouteComponents/QuizPage';
import QuestionPage from './RouteComponents/questionPage';

function App() {
  return (
    <Router>
      <div>
        <a href="https://github.com/malouVich/quizAPI/tree/main" target="_blank">
          <img src={hvvmLogo} className="logo" alt="Hvvm logo" />
        </a>
      </div>

      <nav>
        <Link to="/">Main</Link> |{" "}
        <Link to="/vision">Vision</Link> |{" "}
        <Link to="/endpoints">Endpoints</Link> |{" "}
        <Link to="/quiz">Quiz</Link> |{" "}
        <Link to="/question">Question</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/endpoints" element={<EndpointsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
