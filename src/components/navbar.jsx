import { useState } from 'react'
import Logo from "../assets/logo.png"
import "./components.css"

function Navbar() {

  return (
    <>
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
        <p>MedLock</p>
      </div>
      <nav className="nav-links">
        <a href="">Features</a>
        <a href="">How it works</a>
        <a href="">About</a>
        <a href="">Support</a>
        <button className="started-btn">Get started</button>
      </nav>
     
    </div>
    </>
  )
}

export default Navbar;