import React from 'react'
import { Link } from 'react-router-dom'
import MenuController from './MenuController'

const Navbar = ({ authenticated }) => {
  return (
    <nav id="navbar" className="flex a-i-center j-c-sb shadow-btm">
      <Link id="logo" to="/">PAWFUL</Link>
      <MenuController authenticated={authenticated} />
    </nav>
  )
}

export default Navbar
