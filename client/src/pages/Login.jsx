import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const checkUser = async () => {
    if (!name.trim()) {
      alert("Please enter a valid name.");
      return;
    }
  
    try {
      let res = await fetch(`http://localhost:5000/api/students/${name}`);
      if (res.ok) {
        let data = await res.json();
        setProfile(data);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", "Student");
        navigate("/home");
        return;
      }
  
      res = await fetch(`http://localhost:5000/api/teachers/${name}`);
      if (res.ok) {
        let data = await res.json();
        setProfile(data);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", "Teacher");
        navigate("/home");
        return;
      }
  
      alert("User not found. Please try again or register as a new user.");
    } catch (error) {
      console.error("Error checking user:", error);
      alert("Error checking user. Please try again.");
    }
  };
  

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    setProfile(null);
    setName("");
    setRole("");
    setIsNewUser(false);
    navigate("/");
  };

  const teacherFields = [
    { name: "name", label: "Name", required: true, value: name },
    { name: "gender", label: "Gender", type: "select", required: true, options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
      ]
    },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "contact", label: "Contact", type: "number", pattern: "\\d{10}", maxLength: 10, required: true },
    { name: "salary", label: "Salary", type: "number", required: true },
    { name: "assignedClass", label: "Assigned Class", required: true }  // ✅ Changed "subject" to "assignedClass"
  ];
  
  const studentFields = [
    { name: "name", label: "Name", required: true, value: name },
    { name: "gender", label: "Gender", type: "select", required: true, options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
      ]
    },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "contact", label: "Contact", type: "number", pattern: "\\d{10}", maxLength: 10, required: true },
    { name: "feesPaid", label: "Fees Paid", type: "number", required: true },
    { name: "class", label: "Class", required: true }  // ✅ This is correct for students
  ];
  
  const handleSubmit = async (data) => {
    const endpoint = role === "Teacher" ? "teachers" : "students";
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const newUser = await res.json();
  
      if (res.ok) {
        setProfile(newUser);
        localStorage.setItem("loggedInUser", newUser.name);
        localStorage.setItem("role", role);
        navigate("/home");
      } else {
        alert("Failed to create profile. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div>
      <h1 className="text-xl font-bold">Login</h1>
      {!isNewUser ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="border p-2"
          />
          <button onClick={checkUser} className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
          <button onClick={() => setIsNewUser(true)} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
            New User
          </button>
          {/* <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
            Sign Out
          </button> */}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Role</h2>
          <button onClick={() => setRole("Teacher")} className="bg-green-500 text-white px-4 py-2 m-2">
            Teacher
          </button>
          <button onClick={() => setRole("Student")} className="bg-yellow-500 text-white px-4 py-2 m-2">
            Student
          </button>
          {role && <Form fields={role === "Teacher" ? teacherFields : studentFields} onSubmit={handleSubmit} title={`Create ${role} Profile`} />}
        </div>
      )}
    </div>
  );
}

export default Login;
