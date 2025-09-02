
import React, { useState } from 'react';

const ClassMaster = () => {
  const [formData, setFormData] = useState({
    classcode: '',
    classname: '',
  });
  const [errors, setErrors] = useState({
    classcode: '',
    classname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { classcode: '', classname: '' };

    if (!formData.classcode.trim()) {
      newErrors.classcode = 'Class Code is required';
      isValid = false;
    }
    if (!formData.classname.trim()) {
      newErrors.classname = 'Class Name is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Handle form submission (e.g., API call)
      console.log('Form submitted:', formData);
      alert('Class created successfully!');
      // Reset form
      setFormData({ classcode: '', classname: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-cyan-400 mb-6">
          Create Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="classcode"
              className="block text-sm font-medium text-gray-300"
            >
              Class Code
            </label>
            <input
              type="text"
              id="classcode"
              name="classcode"
              value={formData.classcode}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 bg-gray-700 border ${
                errors.classcode ? 'border-red-500' : 'border-gray-600'
              } rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
              placeholder="e.g., C001"
            />
            {errors.classcode && (
              <p className="mt-1 text-sm text-red-500">{errors.classcode}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="classname"
              className="block text-sm font-medium text-gray-300"
            >
              Class Name
            </label>
            <input
              type="text"
              id="classname"
              name="classname"
              value={formData.classname}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 bg-gray-700 border ${
                errors.classname ? 'border-red-500' : 'border-gray-600'
              } rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
              placeholder="e.g., Class 10A"
            />
            {errors.classname && (
              <p className="mt-1 text-sm text-red-500">{errors.classname}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold transition-colors duration-200"
          >
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassMaster;
