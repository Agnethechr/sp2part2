import { useLocation, useNavigate } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';

export default function LoserPage () {
const location = useLocation();
const navigate = useNavigate ();
const {amount} = location.state;

return (
    <div className="result-page">
      <img src={hvvmLogo} className="logo" alt="Hvvm logo" />
      <h1>Spillet er slut</h1>
      <p>Du har vundet: {amount.toLocaleString()} kr.</p>
      <button onClick={() => navigate('/')}>Spil igen</button>
    </div>
  );
};