import { useLocation, useNavigate } from 'react-router-dom';

export default function WinnerrPage () {
const {state} = useLocation();
const navigate = useNavigate ();

return (
    <div className="result-page">
      <h1>Tillykke du har vundet!</h1>
      <p>Du har vundet: {state.amount.toLocaleString()} kr.</p>
      <button className="start-button" onClick={() => navigate('/question')}>Spil igen</button>
    </div>
  );
};