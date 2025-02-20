/* === Frontend (Students.jsx) === */
import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import Table from '../components/Table';

function Students() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);


  const fetchStudents = () => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data.reverse())); // Newest students first

  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'gender', label: 'Gender', type: 'select', required: true, options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true, format: (value) => new Date(value).toLocaleDateString()  },
    { name: 'contact', label: 'Contact', type: 'number', pattern: "\\d{10}", maxLength: 10, placeholder: "Enter 10-digit number", required: true },
    { name: 'feesPaid', label: 'Fees Paid', type: 'number', step: 'any', required: true },
    { name: 'class', label: 'Class', required: true }
  ];


  const handleSubmit = (data) => {
    if (editingStudent) {
      fetch(`http://localhost:5000/api/students/${editingStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then((updatedStudent) => {
          setStudents(prevStudents =>
            prevStudents.map(student =>
              student._id === updatedStudent._id ? updatedStudent : student
            )
          );
          setEditingStudent(null);
          setIsModalOpen(false);
        });
    } else {
      fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then((newStudent) => {
          setStudents(prevStudents => [newStudent, ...prevStudents]); // Add new student to top

          setIsModalOpen(false);
        });
    }
  };
  
  
  
  
  

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };
  

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' })
      .then(() => setStudents(prevStudents => prevStudents.filter(student => student._id !== id)));
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'dob', label: 'D.O.B' },
    { key: 'contact', label: 'Contact' },
    { key: 'feesPaid', label: 'Fees Paid' },
    { key: 'class', label: 'Class' },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Students</h1>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New</button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
          <Form fields={fields} onSubmit={handleSubmit} initialData={editingStudent || {}} title={editingStudent ? "Edit Student" : "Add Student"} />

            <button onClick={() => setIsModalOpen(false)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
      <Table columns={columns} data={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
export default Students;