import React from "react"
import { Link } from "react-router-dom"
import { authStore } from "../context/authContext"

const Navbar = () => {
  const user = authStore((state) => state.user)
  const logout = authStore((state) => state.logout)
  const handleClick = () => {
    logout()
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>MERN AUTH</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
