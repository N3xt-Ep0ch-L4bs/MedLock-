import { useState } from 'react'
import Logo from "../assets/logo.png"
import "./components.css"

function Navbar() {

  return (
    <>
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
        <h2>MedLock</h2>
      </div>
      <nav className="nav-links">
        <a href="">Features</a>
        <a href="">How it works</a>
        <a href="">About</a>
        <a href="">Support</a>
      </nav>
      <button className="started-btn">Get started</button>
    </div>
    </>
  )
}

export default Navbar;