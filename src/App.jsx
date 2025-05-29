import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';
import './App.css';

import MainPage from './RouteComponents/MainPage';
import VisionPage from './RouteComponents/VisionPage';
import EndpointsPage from './RouteComponents/EndpointsPage';
import StartPage from './RouteComponents/StartPage';
import QuestionPage from './RouteComponents/questionPage';
import WinnerPage from './RouteComponents/WinnerPage';
import LoserPage from './RouteComponents/LoserPage';


function AppLayout() {
  const location = useLocation();
  const hideHeaderAndNav =
    location.pathname === '/quiz' || location.pathname === '/question' || location.pathname === '/winner' || location.pathname === '/loser';

  return (
    <>
      {!hideHeaderAndNav && (
        <>
          <div>
            <a
              href="https://github.com/malouVich/quizAPI/tree/main"
              target="_blank"
            >
              <img src={hvvmLogo} className="logo" alt="Hvvm logo" />
            </a>
          </div>

          <nav>
            <Link to="/">Main</Link> |{' '}
            <Link to="/vision">Vision</Link> |{' '}
            <Link to="/endpoints">Endpoints</Link> |{' '}
            <Link to="/quiz">Quiz</Link> |{' '}
          </nav>
        </>
      )}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/endpoints" element={<EndpointsPage />} />
        <Route path="/quiz" element={<StartPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/winner" element={<WinnerPage />} />
        <Route path="/loser" element={<LoserPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;