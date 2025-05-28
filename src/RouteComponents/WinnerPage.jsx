import { useLocation, useNavigate } from 'react-router-dom';
import hvvmLogo from '/hvvmLogo.png';

export default function WinnerrPage () {
const {state} = useLocation();
const navigate = useNavigate ();

return (
    <div className="result-page">
      <img src={hvvmLogo} className="logo" alt="Hvvm logo" />
      <h1>Tillykke du har vundet!</h1>
      <p>Du har vundet: {state.amount.toLocaleString()} kr.</p>
      <button onClick={() => navigate('/')}>Spil igen</button>
    </div>
  );
};