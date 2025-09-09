import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConvMasteradd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Rcode: '',
    RName: '',
    RRate: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Rcode.trim()) newErrors.Rcode = 'Record Code is required';
    if (!formData.RName.trim()) newErrors.RName = 'Record Name is required';
    if (!formData.RRate || formData.RRate <= 0) newErrors.RRate = 'Rate must be a positive number';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Form submitted:', formData);
    // Add API call or logic to save the record
    navigate('/master/conv');
  };

  const handleCancel = () => {
    navigate('/master/conv');
  };

  return (
    <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="Rcode" className="block text-sm font-medium text-gray-700 mb-1">
              Record Code
            </label>
            <input
              type="text"
              id="Rcode"
              name="Rcode"
              value={formData.Rcode}
              onChange={handleInputChange}
              placeholder="Enter Record Code"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.Rcode && <p className="text-red-500 text-sm mt-1">{errors.Rcode}</p>}
          </div>
          <div>
            <label htmlFor="RName" className="block text-sm font-medium text-gray-700 mb-1">
              Record Name
            </label>
            <input
              type="text"
              id="RName"
              name="RName"
              value={formData.RName}
              onChange={handleInputChange}
              placeholder="Enter Record Name"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.RName && <p className="text-red-500 text-sm mt-1">{errors.RName}</p>}
          </div>
          <div>
            <label htmlFor="RRate" className="block text-sm font-medium text-gray-700 mb-1">
              Rate
            </label>
            <input
              type="number"
              id="RRate"
              name="RRate"
              value={formData.RRate}
              onChange={handleInputChange}
              placeholder="Enter Rate"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.RRate && <p className="text-red-500 text-sm mt-1">{errors.RRate}</p>}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConvMasteradd;