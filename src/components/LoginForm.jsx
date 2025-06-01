// components/LoginForm.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (!res.ok) throw new Error('Login fejlede')

      const data = await res.json()
      localStorage.setItem('token', data.token)
      navigate('/question')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Brugernavn" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Adgangskode" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default LoginForm
