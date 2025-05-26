import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
//Router er den øverste komponent som muliggør routing.
//Routes pakker de forskellige rute-definitioner ind.
//Route definerer en rute eks. URL-sti + komponent der skal vises.
//Link bruges til navigation mellem ruter uden genindlæsning.
//useLocation hook (funktion som du kan bruge til at hente eller styre data) til at få adgang til den aktuelle URL-info.

import hvvmLogo from '/hvvmLogo.png';
import './App.css';

import MainPage from './RouteComponents/MainPage';
import VisionPage from './RouteComponents/VisionPage';
import EndpointsPage from './RouteComponents/EndpointsPage';
import StartPage from './RouteComponents/StartPage';

function Layout() {
  const location = useLocation();
  //Skjuler header + nav på disse pages. 
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

//Starter App op inde i router og derefter læser Layout.
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
