import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserMasterAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addUser } = location.state || {};

  const [formData, setFormData] = useState({
    LoginId: '',
    Password: '',
    UserName: '',
    MobileNo: '',
    SecurityGroup: 'Viewer',
    ValidUpto: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.LoginId.trim()) newErrors.LoginId = 'Login ID is required';
    if (!formData.Password.trim()) newErrors.Password = 'Password is required';
    if (!formData.UserName.trim()) newErrors.UserName = 'User Name is required';
    if (!formData.MobileNo.trim()) newErrors.MobileNo = 'Mobile Number is required';
    else if (!/^\d{10}$/.test(formData.MobileNo)) newErrors.MobileNo = 'Mobile Number must be 10 digits';
    if (!formData.SecurityGroup) newErrors.SecurityGroup = 'Security Group is required';
    if (!formData.ValidUpto) newErrors.ValidUpto = 'Valid Upto date is required';
    else if (new Date(formData.ValidUpto) < new Date()) newErrors.ValidUpto = 'Valid Upto date must be in the future';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = {
        id: Date.now(), // Simple unique ID; replace with UUID in production
        LoginId: formData.LoginId,
        Password: formData.Password, // In production, hash the password before storing
        UserName: formData.UserName,
        MobileNo: formData.MobileNo,
        SecurityGroup: formData.SecurityGroup,
        ValidUpto: formData.ValidUpto,
      };
      if (addUser) {
        addUser(newUser);
      }
      navigate('/master/usermaster');
    }
  };

  const handleCancel = () => {
    navigate('/master/usermaster');
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="mb-4">
            <label htmlFor="LoginId" className="block text-sm font-medium text-gray-700">Login ID</label>
            <input
              type="text"
              id="LoginId"
              name="LoginId"
              value={formData.LoginId}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.LoginId ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., user008"
            />
            {errors.LoginId && <p className="text-red-500 text-sm mt-1">{errors.LoginId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.Password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., pass123"
            />
            {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="UserName" className="block text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              id="UserName"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.UserName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., Alice Johnson"
            />
            {errors.UserName && <p className="text-red-500 text-sm mt-1">{errors.UserName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="MobileNo" className="block text-sm font-medium text-gray-700">Mobile No</label>
            <input
              type="text"
              id="MobileNo"
              name="MobileNo"
              value={formData.MobileNo}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.MobileNo ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 9876543210"
            />
            {errors.MobileNo && <p className="text-red-500 text-sm mt-1">{errors.MobileNo}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="SecurityGroup" className="block text-sm font-medium text-gray-700">Security Group</label>
            <select
              id="SecurityGroup"
              name="SecurityGroup"
              value={formData.SecurityGroup}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.SecurityGroup ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            {errors.SecurityGroup && <p className="text-red-500 text-sm mt-1">{errors.SecurityGroup}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="ValidUpto" className="block text-sm font-medium text-gray-700">Valid Upto</label>
            <input
              type="date"
              id="ValidUpto"
              name="ValidUpto"
              value={formData.ValidUpto}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.ValidUpto ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            />
            {errors.ValidUpto && <p className="text-red-500 text-sm mt-1">{errors.ValidUpto}</p>}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
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
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserMasterAdd;