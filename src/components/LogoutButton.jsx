import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    logout() // logout function needs to be built
    navigate("/")
  }
  return (
    <Link onClick={handleClick}>
      <h3 className="btn login-btn">LOGOUT</h3>
    </Link>
  )
}

export default LogoutButton