import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import Table from "../components/Table";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch teachers
  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((res) => res.json())
      .then((data) =>
        setTeacherList(data.map((teacher) => ({ value: teacher._id, label: teacher.name })))
      )
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  // Fetch classes
  useEffect(() => {
    fetch("http://localhost:5000/api/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error fetching classes:", err));
  }, []);

  const fields = [
    { name: "className", label: "Class Name", required: true },
    { name: "year", label: "Year", type: "number", required: true },
    {
      name: "teacher",
      label: "Teacher",
      type: "select",
      options: teacherList, // Dropdown for teacher selection
      required: true,
    },
    { name: "studentFees", label: "Student Fees", type: "number", required: true },
    {
      name: "studentList",
      label: "Student List",
    },
  ];

  const handleSubmit = (data) => {
    console.log("Submitting Class Data:", data);
  
    const formattedData = {
      className: data.className,
      year: data.year,
      teacher: data.teacher,
      studentFees: data.studentFees,
      studentList: data.studentList ? data.studentList.split(",") : [],
    };
  
    fetch("http://localhost:5000/api/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`); // Catch 404/500 errors
        }
        return res.json();
      })
      .then((newClass) => {
        setClasses((prev) => [...prev, newClass]);
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error adding class:", error));
  };
  

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/classes/${id}`, { method: "DELETE" })
      .then(() => setClasses((prev) => prev.filter((cls) => cls._id !== id)))
      .catch((err) => console.error("Error deleting class:", err));
  };

  const columns = [
    { key: "className", label: "Class Name" },
    { key: "year", label: "Year" },
    {
      key: "teacher",
      label: "Teacher",
      render: (cls) => cls.teacher?.name || "No Teacher", // ✅ Show teacher name, not ID
    },
    { key: "studentFees", label: "Student Fees" },
    {
      key: "studentList",
      label: "Student List",
      render: (cls) => cls.studentList?.join(", ") || "-", // ✅ Display list properly
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Classes</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <Form fields={fields} onSubmit={handleSubmit} title="Add Class" />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Table columns={columns} data={classes} onDelete={handleDelete} />
    </div>
  );
}

export default Classes;
