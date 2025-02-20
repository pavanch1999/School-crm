import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import Table from '../components/Table';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = (teacher) => {
    navigate(`/profile/teachers/${teacher._id}`);
  };
  
  const fetchTeachers = () => {
    fetch('http://localhost:5000/api/teachers')
      .then(res => res.json())
      .then(data => setTeachers(data));
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'gender', label: 'Gender', type: 'select', required: true, options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ] 
    },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { name: 'contact', label: 'Contact Details', type: 'text', pattern: "\\d{10}", maxLength: 10, required: true },
    { name: 'salary', label: 'Salary', type: 'number', required: true },
    { name: 'assignedClass', label: 'Assigned Class', type: 'select', required: true, options: classList },
  ];
  

  const handleSubmit = (data) => {
    fetch('http://localhost:5000/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((newTeacher) => {
      setTeachers(prevTeachers => [newTeacher, ...prevTeachers]); // Add new teacher at the top
      setIsModalOpen(false);
    });
  };
  

  const handleEdit = (teacher) => {
    alert(`Edit teacher: ${teacher.name}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/teachers/${id}`, { method: 'DELETE' })
      .then(() => setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher._id !== id)));
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'dob', label: 'D.O.B' },
    { key: 'contact', label: 'Contact Details' },
    { key: 'salary', label: 'Salary' },
    { key: 'assignedClass', label: 'Assigned Class' },
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
      <Table columns={columns} data={teachers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Teachers;
