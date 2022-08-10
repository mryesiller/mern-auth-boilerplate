import React, { useState } from "react"
import { authStore } from "../context/authContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loginFetch, error, isLoading } = authStore()

  const handleSubmit = (e) => {
    e.preventDefault()

    loginFetch(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login
