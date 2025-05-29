import { useNavigate } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';

export default function StartPage() {
  const navigate = useNavigate();

  //Skal linke videre til questionPage efter man har klikket nyt spil.
  const startNewGame = () => {
    navigate('/QuestionPage');
  };

  return (
    <div className="start-page">
      <img src={hvvmLogo} className="logo" alt="Hvvm logo" />
      <button className="start-button" onClick={startNewGame}>
        Nyt spil
      </button>
    </div>
  );
}