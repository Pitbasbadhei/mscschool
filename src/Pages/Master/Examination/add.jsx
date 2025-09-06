
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExaminationAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Examcode: '',
    ExamName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic to send formData to backend or update state
    navigate('/master/examination'); // Navigate back to Examination view after submission
  };

  const handleCancel = () => {
    navigate('/master/examination'); // Navigate back to Examination view
  };

  return (
    <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Examination</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="Examcode" className="block text-sm font-medium text-gray-700">
              Exam Code
            </label>
            <input
              type="text"
              id="Examcode"
              name="Examcode"
              value={formData.Examcode}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="ExamName" className="block text-sm font-medium text-gray-700">
              Exam Name
            </label>
            <input
              type="text"
              id="ExamName"
              name="ExamName"
              value={formData.ExamName}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExaminationAdd;
