// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import ChatApp from './Chatapp';
import Home from './Home';
import Card2 from './Card2'; 
function App() {
  return (
    <Router>
      <Routes>
        
         <Route path="/" element={<Home />} />
          <Route path="/card2" element={<Card2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
