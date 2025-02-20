import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import Table from '../components/Table';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [classList, setClassList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch teachers
  useEffect(() => {
    fetch('http://localhost:5000/api/teachers')
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => console.error("Error fetching teachers:", err));
  }, []);

  // Fetch classes
  useEffect(() => {
    fetch('http://localhost:5000/api/classes')
      .then(res => res.json())
      .then(data => setClassList(data.map(cls => ({ value: cls._id, label: cls.className }))));
  }, []);

  const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'gender', label: 'Gender', type: 'select', required: true, options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { name: 'contact', label: 'Contact', type: 'number', required: true },
    { name: 'salary', label: 'Salary', type: 'number', required: true },
    { name: 'assignedClass', label: 'Assigned Class', type: 'select', required: true, options: classList }
  ];

  const handleSubmit = (data) => {
    console.log("Submitting Teacher Data:", data);

    // Convert assignedClass to ObjectId format
    const formattedData = { ...data, assignedClass: data.assignedClass.value };

    fetch('http://localhost:5000/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    })
      .then(res => res.json())
      .then((newTeacher) => {
        if (newTeacher._id) {
          setTeachers(prev => [...prev, newTeacher]);
          setIsModalOpen(false);
        } else {
          console.error("Error adding teacher:", newTeacher);
        }
      })
      .catch(error => console.error("Error adding teacher:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/teachers/${id}`, { method: 'DELETE' })
      .then(() => setTeachers(prev => prev.filter(teacher => teacher._id !== id)))
      .catch(err => console.error("Error deleting teacher:", err));
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'dob', label: 'D.O.B' },
    { key: 'contact', label: 'Contact' },
    { key: 'salary', label: 'Salary' },
    { key: 'assignedClass', label: 'Assigned Class' }
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Teachers</h1>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New</button>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <Form fields={fields} onSubmit={handleSubmit} title="Add Teacher" />
            <button onClick={() => setIsModalOpen(false)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
      
      <Table columns={columns} data={teachers} onDelete={handleDelete} />
    </div>
  );
}

export default Teachers;
