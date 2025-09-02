import React, { useState } from 'react';

const SectionForm = () => {
  // Define a mapping of class codes to class names
  const classNameMap = {
    CS101: 'Introduction to Programming',
    CS102: 'Data Structures',
    CS103: 'Algorithms'
  };

  const [formData, setFormData] = useState({
    sectionName: '',
    classCode: '',
    className: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      // If the changed field is classCode, update both classCode and className
      if (name === 'classCode') {
        return {
          ...prevState,
          classCode: value,
          className: classNameMap[value] || '' // Set className based on classCode, or empty if no mapping
        };
      }
      // For other fields (excluding className), update normally
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Section Form</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700">
            Section Name
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            value={formData.sectionName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter section name"
          />
        </div>

        <div>
          <label htmlFor="classCode" className="block text-sm font-medium text-gray-700">
            Class Code
          </label>
          <select
            id="classCode"
            name="classCode"
            value={formData.classCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select a class code</option>
            <option value="CS101">CS101</option>
            <option value="CS102">CS102</option>
            <option value="CS103">CS103</option>
          </select>
        </div>

        <div>
          <label htmlFor="className" className="block text-sm font-medium text-gray-700">
            Class Name
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Class name will be set automatically"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SectionForm;