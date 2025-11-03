import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'
import LandingPage from './pages/landingpage';
import './App.css'

function App() {

  return (
    <>
   <div className="app">
      <Navbar />
      <LandingPage />
      </div>
    </>
  )
}

export default App
