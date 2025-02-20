import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <ul className="flex space-x-4">
        <li><Link to="/home">Home</Link></li> {/* Updated to "/home" to prevent reloads */}
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/teachers">Teachers</Link></li>
        <li><Link to="/classes">Classes</Link></li>
      </ul>
      <div>
        {!loggedInUser ? (
          <Link to="/" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
        ) : (
          <button onClick={handleSignOut} className="bg-red-500 px-4 py-2 rounded">
            Sign Out
          </button>
        )}
      </div>
      {loggedInUser && (
        <select
          className="bg-white text-black p-2 rounded"
          value={role}
          onChange={(e) => {
            const newRole = e.target.value;
            setRole(newRole);
            localStorage.setItem("role", newRole);
          }}
        >
          <option value="">Select Role</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
      )}
    </nav>
  );
}

export default Navbar;
