import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';
import './App.css';
import { useNavigate } from 'react-router-dom';


import MainPage from './RouteComponents/MainPage';
import VisionPage from './RouteComponents/VisionPage';
import EndpointsPage from './RouteComponents/EndpointsPage';
import StartPage from './RouteComponents/StartPage';
//import QuestionPage from './RouteComponents/questionPage';
import QuestionPage from './RouteComponents/QuestionsPage';
import WinnerPage from './RouteComponents/WinnerPage';
import LoserPage from './RouteComponents/LoserPage';
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'


function AppLayout() {
  const token = localStorage.getItem('token');
const navigate = useNavigate();
  const location = useLocation();
  const hideHeaderAndNav =
    location.pathname === '/quiz' || location.pathname === '/question' || location.pathname === '/winner' || location.pathname === '/loser'|| location.pathname === '/login';

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
       <Route path="/login" element={<LoginForm />} /> {/* 👈 LOGIN route her */}
       <Route path="/question" element={
  <ProtectedRoute>
    <QuestionPage />
  </ProtectedRoute>
} />

<Route path="/winner" element={
  <ProtectedRoute>
    <WinnerPage />
  </ProtectedRoute>
} />

<Route path="/loser" element={
  <ProtectedRoute>
    <LoserPage />
  </ProtectedRoute>
} />

      </Routes>
      {token && (
  <button
    onClick={() => {
      localStorage.removeItem('token');
      navigate('/');
    }}
    style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5em 1em',
      cursor: 'pointer',
      zIndex: 1000
    }}
  >
    Log ud
  </button>
)}

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