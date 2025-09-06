import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectMasterAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    SubjectCode: '',
    SubjectName: '',
    FullMark: '',
    PassMark: '',
    AddTotal: false,
    OrderNo: '',
    ClassName: '',
    ExamName: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.SubjectCode.trim()) newErrors.SubjectCode = 'Subject Code is required';
    if (!formData.SubjectName.trim()) newErrors.SubjectName = 'Subject Name is required';
    if (!formData.FullMark || formData.FullMark <= 0) newErrors.FullMark = 'Full Mark must be a positive number';
    if (!formData.PassMark || formData.PassMark <= 0) newErrors.PassMark = 'Pass Mark must be a positive number';
    if (formData.PassMark > formData.FullMark) newErrors.PassMark = 'Pass Mark cannot exceed Full Mark';
    if (!formData.OrderNo || formData.OrderNo <= 0) newErrors.OrderNo = 'Order No must be a positive number';
    if (!formData.ClassName.trim()) newErrors.ClassName = 'Class Name is required';
    if (!formData.ExamName.trim()) newErrors.ExamName = 'Exam Name is required';
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
    // Add API call or logic to save the subject
    navigate('/master/subject');
  };

  const handleCancel = () => {
    navigate('/master/subject');
  };

  return (
    <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Subject</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label htmlFor="SubjectCode" className="block text-sm font-medium text-gray-700 mb-1">
              Subject Code
            </label>
            <input
              type="text"
              id="SubjectCode"
              name="SubjectCode"
              value={formData.SubjectCode}
              onChange={handleInputChange}
              placeholder="Enter Subject Code"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.SubjectCode && <p className="text-red-500 text-sm mt-1">{errors.SubjectCode}</p>}
          </div>
          <div>
            <label htmlFor="SubjectName" className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              id="SubjectName"
              name="SubjectName"
              value={formData.SubjectName}
              onChange={handleInputChange}
              placeholder="Enter Subject Name"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.SubjectName && <p className="text-red-500 text-sm mt-1">{errors.SubjectName}</p>}
          </div>
          <div>
            <label htmlFor="FullMark" className="block text-sm font-medium text-gray-700 mb-1">
              Full Mark
            </label>
            <input
              type="number"
              id="FullMark"
              name="FullMark"
              value={formData.FullMark}
              onChange={handleInputChange}
              placeholder="Enter Full Mark"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.FullMark && <p className="text-red-500 text-sm mt-1">{errors.FullMark}</p>}
          </div>
          <div>
            <label htmlFor="PassMark" className="block text-sm font-medium text-gray-700 mb-1">
              Pass Mark
            </label>
            <input
              type="number"
              id="PassMark"
              name="PassMark"
              value={formData.PassMark}
              onChange={handleInputChange}
              placeholder="Enter Pass Mark"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.PassMark && <p className="text-red-500 text-sm mt-1">{errors.PassMark}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="flex items-center">
            <label htmlFor="AddTotal" className="block text-sm font-medium text-gray-700 mr-3">
              Add to Total
            </label>
            <input
              type="checkbox"
              id="AddTotal"
              name="AddTotal"
              checked={formData.AddTotal}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="OrderNo" className="block text-sm font-medium text-gray-700 mb-1">
              Order No
            </label>
            <input
              type="number"
              id="OrderNo"
              name="OrderNo"
              value={formData.OrderNo}
              onChange={handleInputChange}
              placeholder="Enter Order No"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.OrderNo && <p className="text-red-500 text-sm mt-1">{errors.OrderNo}</p>}
          </div>
          <div>
            <label htmlFor="ClassName" className="block text-sm font-medium text-gray-700 mb-1">
              Class Name
            </label>
            <input
              type="text"
              id="ClassName"
              name="ClassName"
              value={formData.ClassName}
              onChange={handleInputChange}
              placeholder="Enter Class Name"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.ClassName && <p className="text-red-500 text-sm mt-1">{errors.ClassName}</p>}
          </div>
          <div>
            <label htmlFor="ExamName" className="block text-sm font-medium text-gray-700 mb-1">
              Exam Name
            </label>
            <input
              type="text"
              id="ExamName"
              name="ExamName"
              value={formData.ExamName}
              onChange={handleInputChange}
              placeholder="Enter Exam Name"
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.ExamName && <p className="text-red-500 text-sm mt-1">{errors.ExamName}</p>}
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

export default SubjectMasterAdd;