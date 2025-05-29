function EndpointsPage() {
  return (
    <div>
      <h2>API Endpoints</h2>

      <h3>Spørgsmål (Questions)</h3>
      <table className="endpoints">
        <thead>
          <tr>
            <th>Handling</th>
            <th>Method</th>
            <th>Endpoint</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Opret spørgsmål</td><td>POST</td><td>/api/questions</td></tr>
          <tr><td>Hent alle spørgsmål</td><td>GET</td><td>/api/questions</td></tr>
          <tr><td>Hent et bestemt spørgsmål</td><td>GET</td><td>/api/questions/&#123;id&#125;</td></tr>
          <tr><td>Opdater et spørgsmål</td><td>PUT</td><td>/api/questions/&#123;id&#125;</td></tr>
          <tr><td>Slet et spørgsmål</td><td>DELETE</td><td>/api/questions/&#123;id&#125;</td></tr>
        </tbody>
      </table>

      <h3>Spil-session (Game)</h3>
      <table>
        <thead>
          <tr>
            <th>Handling</th>
            <th>Method</th>
            <th>Endpoint</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Start et nyt spil</td><td>POST</td><td>/api/game/start</td></tr>
          <tr><td>Svare på et spørgsmål</td><td>POST</td><td>/api/game/answer</td></tr>
          <tr><td>Hent spilstatus</td><td>GET</td><td>/api/game/status</td></tr>
          <tr><td>Afslut spillet</td><td>POST</td><td>/api/game/end</td></tr>
        </tbody>
      </table>

      <h3>Authentication</h3>
      <table>
        <thead>
          <tr>
            <th>Handling</th>
            <th>Method</th>
            <th>Endpoint</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Login</td><td>POST</td><td>/api/auth/login</td></tr>
          <tr><td>Logout</td><td>POST</td><td>/api/auth/logout</td></tr>
        </tbody>
      </table>
    </div>
  );
}
export default EndpointsPage;
