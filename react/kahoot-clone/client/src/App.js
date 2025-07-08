import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import CreateGame from './components/CreateGame'
import JoinGame from './components/JoinGame'
import Game from './components/Game'
import Host from './components/Host'
import QuestionSetup from './components/QuestionSetup'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={<CreateGame setUsername={setUsername} />}
          />
          <Route
            path="/join"
            element={<JoinGame setUsername={setUsername} />}
          />
          <Route path="/game/:gameId" element={<Game username={username} />} />
          <Route path="/host/:gameId" element={<Host />} />
          <Route path="/question-setup/:gameId" element={<QuestionSetup />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
