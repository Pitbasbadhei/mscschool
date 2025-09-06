
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Feemasteradd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FeeOrderNo: '',
    Classcode: '',
    ClassName: '',
    FeeType: '',
    FeeName: '',
    FeeAmount: '',
    GLCode: '',
    DESCRIPT: '',
    EffectMonth: '',
  });

  // Static classmaster mapping for Classcode to ClassName based on demoData
  const classmaster = [
    { Classcode: 'CL001', ClassName: 'Math 101' },
    { Classcode: 'CL002', ClassName: 'Physics 101' },
    { Classcode: 'CL003', ClassName: 'Chemistry 101' },
    { Classcode: 'CL004', ClassName: 'Biology 101' },
    { Classcode: 'CL005', ClassName: 'History 101' },
    { Classcode: 'CL006', ClassName: 'Literature 101' },
    { Classcode: 'CL007', ClassName: 'Art 101' },
  ];

  // Static glmaster mapping for GLCode to DESCRIPT based on demoData
  const glmaster = [
    { GLCode: 'GL001', DESCRIPT: 'Math course fee' },
    { GLCode: 'GL002', DESCRIPT: 'Physics lab fee' },
    { GLCode: 'GL003', DESCRIPT: 'Chemistry course fee' },
    { GLCode: 'GL004', DESCRIPT: 'Biology lab fee' },
    { GLCode: 'GL005', DESCRIPT: 'History course fee' },
    { GLCode: 'GL006', DESCRIPT: 'Literature course fee' },
    { GLCode: 'GL007', DESCRIPT: 'Art material fee' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // Automatically set ClassName based on Classcode
      if (name === 'Classcode') {
        const selectedClass = classmaster.find((item) => item.Classcode === value);
        updatedData.ClassName = selectedClass ? selectedClass.ClassName : '';
      }

      // Automatically set DESCRIPT based on GLCode
      if (name === 'GLCode') {
        const selectedGL = glmaster.find((item) => item.GLCode === value);
        updatedData.DESCRIPT = selectedGL ? selectedGL.DESCRIPT : '';
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic to send formData to backend or update state
    navigate('/master/feemaster'); // Navigate back to Feemasterview after submission
  };

  const handleCancel = () => {
    navigate('/master/feemaster'); // Navigate back to Feemasterview
  };

  return (
    <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Fee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="FeeOrderNo" className="block text-sm font-medium text-gray-700">
              Fee Order No
            </label>
            <input
              type="number"
              id="FeeOrderNo"
              name="FeeOrderNo"
              value={formData.FeeOrderNo}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="Classcode" className="block text-sm font-medium text-gray-700">
              Class Code
            </label>
            <select
              id="Classcode"
              name="Classcode"
              value={formData.Classcode}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select Class Code</option>
              {classmaster.map((item) => (
                <option key={item.Classcode} value={item.Classcode}>
                  {item.Classcode}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ClassName" className="block text-sm font-medium text-gray-700">
              Class Name
            </label>
            <input
              type="text"
              id="ClassName"
              name="ClassName"
              value={formData.ClassName}
              readOnly
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="FeeType" className="block text-sm font-medium text-gray-700">
              Fee Type
            </label>
            <input
              type="text"
              id="FeeType"
              name="FeeType"
              value={formData.FeeType}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="FeeName" className="block text-sm font-medium text-gray-700">
              Fee Name
            </label>
            <input
              type="text"
              id="FeeName"
              name="FeeName"
              value={formData.FeeName}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="FeeAmount" className="block text-sm font-medium text-gray-700">
              Fee Amount
            </label>
            <input
              type="number"
              id="FeeAmount"
              name="FeeAmount"
              value={formData.FeeAmount}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="GLCode" className="block text-sm font-medium text-gray-700">
              GL Code
            </label>
            <select
              id="GLCode"
              name="GLCode"
              value={formData.GLCode}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select GL Code</option>
              {glmaster.map((item) => (
                <option key={item.GLCode} value={item.GLCode}>
                  {item.GLCode}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="DESCRIPT" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="DESCRIPT"
              name="DESCRIPT"
              value={formData.DESCRIPT}
              readOnly
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="EffectMonth" className="block text-sm font-medium text-gray-700">
              Effect Month
            </label>
            <select
              id="EffectMonth"
              name="EffectMonth"
              value={formData.EffectMonth}
              onChange={handleChange}
              className="mt-1 px-3 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select Month</option>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
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

export default Feemasteradd;
