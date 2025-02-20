import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import Table from '../components/Table';

function Classes() {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClasses = () => {
    fetch('http://localhost:5000/api/classes')
      .then(res => res.json())
      .then(data => setClasses(data));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fields = [
    { name: 'className', label: 'Class Name', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'teacher', label: 'Teacher', type: 'select', required: true, options: teacherList }, 
    { name: 'studentFees', label: 'Student Fees', type: 'number', required: true },
    { name: 'students', label: 'Students', type: 'select', required: true, multiple: true, options: studentList },  
  ];
  

  const handleSubmit = (data) => {
    fetch('http://localhost:5000/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((newClass) => {
      setClasses(prevClasses => [newClass, ...prevClasses]); // Add new class at the top
      setIsModalOpen(false);
    });
  };
  

  const handleEdit = (classData) => {
    alert(`Edit class: ${classData.name}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/classes/${id}`, { method: 'DELETE' })
      .then(() => setClasses(prevClasses => prevClasses.filter(classItem => classItem._id !== id)));
  };

  const columns = [
    { key: 'className', label: 'Class Name' },
    { key: 'year', label: 'Year' },
    { key: 'teacher', label: 'Teacher' },
    { key: 'studentFees', label: 'Student Fees' },
    { key: 'students', label: 'Student List' }, 
  ];
  


  return (
    <div>
      <h1 className="text-xl font-bold">Classes</h1>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New</button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <Form fields={fields} onSubmit={handleSubmit} title="Add Class" />
            <button onClick={() => setIsModalOpen(false)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
      <Table columns={columns} data={classes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Classes;
