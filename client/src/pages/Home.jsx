import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const role = localStorage.getItem("role"); 

    if (!loggedInUser || !role) {
      navigate("/"); // Redirect if user is not logged in
      return;
    }

    const endpoint = role === "Teacher" ? "teachers" : "students"; // Determine API endpoint

    fetch(`http://localhost:5000/api/${endpoint}/${loggedInUser}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setUser(null); // Ensure user state is reset on error
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Error fetching profile. Please try again.</p>;

  const columns = [
    { key: "name", label: "Name" },
    { key: "gender", label: "Gender" },
    { key: "dob", label: "D.O.B" },
    { key: "contact", label: "Contact" },
    ...(user.role === "Teacher"
      ? [
          { key: "salary", label: "Salary" },
          { key: "assignedClass", label: "Assigned Class" },
        ]
      : [
          { key: "feesPaid", label: "Fees Paid" },
          { key: "class", label: "Class" },
        ]),
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Profile Details</h1>
      <Table columns={columns} data={[user]} />
    </div>
  );
}

export default Home;
