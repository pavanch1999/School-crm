import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students.jsx';
import Teachers from './pages/teachers.jsx';
import Classes from './pages/Classes';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
          
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;