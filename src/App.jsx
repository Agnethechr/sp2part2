import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';
import './App.css';

import MainPage from './RouteComponents/MainPage';
import VisionPage from './RouteComponents/VisionPage';
import EndpointsPage from './RouteComponents/EndpointsPage';
import StartPage from './RouteComponents/StartPage';

function Layout() {
  const location = useLocation();
  const hideHeaderAndNav = location.pathname === '/quiz';

  return (
    <>
      {!hideHeaderAndNav && (
        <>
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
          </nav>
        </>
      )}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/endpoints" element={<EndpointsPage />} />
        <Route path="/quiz" element={<StartPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
