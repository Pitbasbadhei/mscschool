import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SportMasterAdd = ({ addSport }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    SportCode: '',
    SportName: '',
    FeeType: 'Annual',
    Rate: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.SportCode.trim()) newErrors.SportCode = 'Sport Code is required';
    if (!formData.SportName.trim()) newErrors.SportName = 'Sport Name is required';
    if (!formData.Rate || isNaN(formData.Rate) || formData.Rate <= 0) {
      newErrors.Rate = 'Rate must be a positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Create new sport object with a unique ID
      const newSport = {
        id: Date.now(), // Simple unique ID generation; replace with a more robust method if needed
        SportCode: formData.SportCode,
        SportName: formData.SportName,
        FeeType: formData.FeeType,
        Rate: parseFloat(formData.Rate),
      };
      // Call addSport function to update the parent component's state (if provided)
      if (addSport) {
        addSport(newSport);
      }
      // Navigate back to SportMasterView
      navigate('/master/sportmaster');
    }
  };

  const handleCancel = () => {
    navigate('/master/sportmaster');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Sport</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="SportCode" className="block text-sm font-medium text-gray-700">
            Sport Code
          </label>
          <input
            type="text"
            id="SportCode"
            name="SportCode"
            value={formData.SportCode}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.SportCode ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            placeholder="e.g., SC008"
          />
          {errors.SportCode && <p className="text-red-500 text-sm mt-1">{errors.SportCode}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="SportName" className="block text-sm font-medium text-gray-700">
            Sport Name
          </label>
          <input
            type="text"
            id="SportName"
            name="SportName"
            value={formData.SportName}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.SportName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            placeholder="e.g., Table Tennis"
          />
          {errors.SportName && <p className="text-red-500 text-sm mt-1">{errors.SportName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="FeeType" className="block text-sm font-medium text-gray-700">
            Fee Type
          </label>
          <select
            id="FeeType"
            name="FeeType"
            value={formData.FeeType}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="Annual">Annual</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="Rate" className="block text-sm font-medium text-gray-700">
            Rate ($)
          </label>
          <input
            type="number"
            id="Rate"
            name="Rate"
            value={formData.Rate}
            onChange={handleChange}
            className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.Rate ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            placeholder="e.g., 70"
            step="0.01"
          />
          {errors.Rate && <p className="text-red-500 text-sm mt-1">{errors.Rate}</p>}
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
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add Sport
          </button>
        </div>
      </form>
    </div>
  );
};

export default SportMasterAdd;