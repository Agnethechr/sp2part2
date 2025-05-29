import { useLocation, useNavigate } from 'react-router-dom';

export default function LoserPage () {
const location = useLocation();
const navigate = useNavigate ();
const {amount} = location.state;

return (
    <div className="result-page">
      <h1>Spillet er slut</h1>
      <p>Du har vundet: {amount.toLocaleString()} kr.</p>
      <button className="start-button" onClick={() => navigate('/question')}>Spil igen</button>
    </div>
  );
};