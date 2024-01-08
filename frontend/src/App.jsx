import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { socket } from './socket'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Home from './components/Home'
import Signup from './pages/Signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
