import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [role, setRole] = useState("");

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/teachers">Teachers</Link></li>
        <li><Link to="/classes">Classes</Link></li>
      </ul>
      <select
        className="bg-white text-black p-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="Teacher">Teacher</option>
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
      </select>
    </nav>
  );
}

export default Navbar;
