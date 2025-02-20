import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile({ userType }) {
  const { id } = useParams(); // Get user ID from URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/${userType}/${id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [id, userType]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">{userData.name}'s Profile</h2>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Gender:</strong> {userData.gender}</p>
      <p><strong>DOB:</strong> {new Date(userData.dob).toLocaleDateString()}</p>
      <p><strong>Contact:</strong> {userData.contact}</p>
      {userType === "students" && <p><strong>Class:</strong> {userData.class}</p>}
      {userType === "teachers" && <p><strong>Subjects:</strong> {userData.subjects?.join(", ")}</p>}
    </div>
  );
}

export default Profile;
