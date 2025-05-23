import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';
import './App.css';

import MainPage from './RouteComponents/MainPage';
import VisionPage from './RouteComponents/VisionPage';
import EndpointsPage from './RouteComponents/EndpointsPage';

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
        <Link to="/endpoints">Endpoints</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/endpoints" element={<EndpointsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
