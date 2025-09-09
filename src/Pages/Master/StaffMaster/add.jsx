import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StaffMasterAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addStaff } = location.state || {};

  const [formData, setFormData] = useState({
    StaffCode: '',
    StaffName: '',
    Designation: '',
    Department: '',
    PF: 'No',
    PFNO: '',
    ESI: 'No',
    ESINO: '',
    PTAX: 'No',
    Basic: '',
    DA: '',
    HRA: '',
    Other: '',
    PFDeduction: '',
    ESIDeduction: '',
    PTAXDeduction: '',
    AdvDeduction: '',
  });
  const [errors, setErrors] = useState({});

  const calculateTotals = () => {
    const basic = parseFloat(formData.Basic) || 0;
    const da = parseFloat(formData.DA) || 0;
    const hra = parseFloat(formData.HRA) || 0;
    const other = parseFloat(formData.Other) || 0;
    const pfDeduction = parseFloat(formData.PFDeduction) || 0;
    const esiDeduction = parseFloat(formData.ESIDeduction) || 0;
    const ptaxDeduction = parseFloat(formData.PTAXDeduction) || 0;
    const advDeduction = parseFloat(formData.AdvDeduction) || 0;

    const grossTotal = basic + da + hra + other;
    const deductionTotal = pfDeduction + esiDeduction + ptaxDeduction + advDeduction;
    const netTotal = grossTotal - deductionTotal;

    return { grossTotal, deductionTotal, netTotal };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.StaffCode.trim()) newErrors.StaffCode = 'Staff Code is required';
    if (!formData.StaffName.trim()) newErrors.StaffName = 'Staff Name is required';
    if (!formData.Designation.trim()) newErrors.Designation = 'Designation is required';
    if (!formData.Department.trim()) newErrors.Department = 'Department is required';
    if (formData.PF === 'Yes' && !formData.PFNO.trim()) newErrors.PFNO = 'PF Number is required when PF is Yes';
    if (formData.ESI === 'Yes' && !formData.ESINO.trim()) newErrors.ESINO = 'ESI Number is required when ESI is Yes';
    if (!formData.Basic || isNaN(formData.Basic) || formData.Basic <= 0) {
      newErrors.Basic = 'Basic salary must be a positive number';
    }
    if (formData.DA && (isNaN(formData.DA) || formData.DA < 0)) {
      newErrors.DA = 'DA must be a non-negative number';
    }
    if (formData.HRA && (isNaN(formData.HRA) || formData.HRA < 0)) {
      newErrors.HRA = 'HRA must be a non-negative number';
    }
    if (formData.Other && (isNaN(formData.Other) || formData.Other < 0)) {
      newErrors.Other = 'Other allowance must be a non-negative number';
    }
    if (formData.PFDeduction && (isNaN(formData.PFDeduction) || formData.PFDeduction < 0)) {
      newErrors.PFDeduction = 'PF Deduction must be a non-negative number';
    }
    if (formData.ESIDeduction && (isNaN(formData.ESIDeduction) || formData.ESIDeduction < 0)) {
      newErrors.ESIDeduction = 'ESI Deduction must be a non-negative number';
    }
    if (formData.PTAXDeduction && (isNaN(formData.PTAXDeduction) || formData.PTAXDeduction < 0)) {
      newErrors.PTAXDeduction = 'PTAX Deduction must be a non-negative number';
    }
    if (formData.AdvDeduction && (isNaN(formData.AdvDeduction) || formData.AdvDeduction < 0)) {
      newErrors.AdvDeduction = 'Adv. Deduction must be a non-negative number';
    }
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
      const { grossTotal, deductionTotal, netTotal } = calculateTotals();
      const newStaff = {
        id: Date.now(), // Simple unique ID; replace with UUID in production
        StaffCode: formData.StaffCode,
        StaffName: formData.StaffName,
        Designation: formData.Designation,
        Department: formData.Department,
        PF: formData.PF,
        PFNO: formData.PF === 'Yes' ? formData.PFNO : '',
        ESI: formData.ESI,
        ESINO: formData.ESI === 'Yes' ? formData.ESINO : '',
        PTAX: formData.PTAX,
        Basic: parseFloat(formData.Basic) || 0,
        DA: parseFloat(formData.DA) || 0,
        HRA: parseFloat(formData.HRA) || 0,
        Other: parseFloat(formData.Other) || 0,
        GrossTotal: grossTotal,
        PFDeduction: parseFloat(formData.PFDeduction) || 0,
        ESIDeduction: parseFloat(formData.ESIDeduction) || 0,
        PTAXDeduction: parseFloat(formData.PTAXDeduction) || 0,
        AdvDeduction: parseFloat(formData.AdvDeduction) || 0,
        DeductionTotal: deductionTotal,
        NetTotal: netTotal,
      };
      if (addStaff) {
        addStaff(newStaff);
      }
      navigate('/master/staffmaster');
    }
  };

  const handleCancel = () => {
    navigate('/master/staffmaster');
  };

  const { grossTotal, deductionTotal, netTotal } = calculateTotals();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Staff</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="mb-4">
            <label htmlFor="StaffCode" className="block text-sm font-medium text-gray-700">Staff Code</label>
            <input
              type="text"
              id="StaffCode"
              name="StaffCode"
              value={formData.StaffCode}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.StaffCode ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., ST008"
            />
            {errors.StaffCode && <p className="text-red-500 text-sm mt-1">{errors.StaffCode}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="StaffName" className="block text-sm font-medium text-gray-700">Staff Name</label>
            <input
              type="text"
              id="StaffName"
              name="StaffName"
              value={formData.StaffName}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.StaffName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., Alice Johnson"
            />
            {errors.StaffName && <p className="text-red-500 text-sm mt-1">{errors.StaffName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Designation" className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              id="Designation"
              name="Designation"
              value={formData.Designation}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.Designation ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., Consultant"
            />
            {errors.Designation && <p className="text-red-500 text-sm mt-1">{errors.Designation}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Department" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              id="Department"
              name="Department"
              value={formData.Department}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.Department ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., Sales"
            />
            {errors.Department && <p className="text-red-500 text-sm mt-1">{errors.Department}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="PF" className="block text-sm font-medium text-gray-700">PF (Yes/No)</label>
            <select
              id="PF"
              name="PF"
              value={formData.PF}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="PFNO" className="block text-sm font-medium text-gray-700">PF Number</label>
            <input
              type="text"
              id="PFNO"
              name="PFNO"
              value={formData.PFNO}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.PFNO ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., PF123456"
              disabled={formData.PF === 'No'}
            />
            {errors.PFNO && <p className="text-red-500 text-sm mt-1">{errors.PFNO}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="ESI" className="block text-sm font-medium text-gray-700">ESI (Yes/No)</label>
            <select
              id="ESI"
              name="ESI"
              value={formData.ESI}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="ESINO" className="block text-sm font-medium text-gray-700">ESI Number</label>
            <input
              type="text"
              id="ESINO"
              name="ESINO"
              value={formData.ESINO}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.ESINO ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., ESI789012"
              disabled={formData.ESI === 'No'}
            />
            {errors.ESINO && <p className="text-red-500 text-sm mt-1">{errors.ESINO}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="PTAX" className="block text-sm font-medium text-gray-700">PTAX (Yes/No)</label>
            <select
              id="PTAX"
              name="PTAX"
              value={formData.PTAX}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Addition Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="mb-4">
            <label htmlFor="Basic" className="block text-sm font-medium text-gray-700">Basic Amount</label>
            <input
              type="number"
              id="Basic"
              name="Basic"
              value={formData.Basic}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.Basic ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 30000"
              step="0.01"
            />
            {errors.Basic && <p className="text-red-500 text-sm mt-1">{errors.Basic}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="DA" className="block text-sm font-medium text-gray-700">DA Amount</label>
            <input
              type="number"
              id="DA"
              name="DA"
              value={formData.DA}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.DA ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 5000"
              step="0.01"
            />
            {errors.DA && <p className="text-red-500 text-sm mt-1">{errors.DA}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="HRA" className="block text-sm font-medium text-gray-700">HRA Amount</label>
            <input
              type="number"
              id="HRA"
              name="HRA"
              value={formData.HRA}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.HRA ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 7000"
              step="0.01"
            />
            {errors.HRA && <p className="text-red-500 text-sm mt-1">{errors.HRA}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Other" className="block text-sm font-medium text-gray-700">Other Amount</label>
            <input
              type="number"
              id="Other"
              name="Other"
              value={formData.Other}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.Other ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 2000"
              step="0.01"
            />
            {errors.Other && <p className="text-red-500 text-sm mt-1">{errors.Other}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gross Total Amount</label>
            <input
              type="text"
              value={grossTotal.toFixed(2)}
              className="mt-1 w-full px-3 py-2 rounded-md border-gray-300 bg-gray-100 shadow-sm text-right"
              disabled
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Deduction Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="mb-4">
            <label htmlFor="PFDeduction" className="block text-sm font-medium text-gray-700">PF Deduction Amount</label>
            <input
              type="number"
              id="PFDeduction"
              name="PFDeduction"
              value={formData.PFDeduction}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.PFDeduction ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 1800"
              step="0.01"
              disabled={formData.PF === 'No'}
            />
            {errors.PFDeduction && <p className="text-red-500 text-sm mt-1">{errors.PFDeduction}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="ESIDeduction" className="block text-sm font-medium text-gray-700">ESI Deduction Amount</label>
            <input
              type="number"
              id="ESIDeduction"
              name="ESIDeduction"
              value={formData.ESIDeduction}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.ESIDeduction ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 500"
              step="0.01"
              disabled={formData.ESI === 'No'}
            />
            {errors.ESIDeduction && <p className="text-red-500 text-sm mt-1">{errors.ESIDeduction}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="PTAXDeduction" className="block text-sm font-medium text-gray-700">PTAX Deduction Amount</label>
            <input
              type="number"
              id="PTAXDeduction"
              name="PTAXDeduction"
              value={formData.PTAXDeduction}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.PTAXDeduction ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 200"
              step="0.01"
              disabled={formData.PTAX === 'No'}
            />
            {errors.PTAXDeduction && <p className="text-red-500 text-sm mt-1">{errors.PTAXDeduction}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="AdvDeduction" className="block text-sm font-medium text-gray-700">Adv. Deduction Amount</label>
            <input
              type="number"
              id="AdvDeduction"
              name="AdvDeduction"
              value={formData.AdvDeduction}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.AdvDeduction ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-right`}
              placeholder="e.g., 1000"
              step="0.01"
            />
            {errors.AdvDeduction && <p className="text-red-500 text-sm mt-1">{errors.AdvDeduction}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Deduction Total Amount</label>
            <input
              type="text"
              value={deductionTotal.toFixed(2)}
              className="mt-1 w-full px-3 py-2 rounded-md border-gray-300 bg-gray-100 shadow-sm text-right"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Net Total Amount</label>
            <input
              type="text"
              value={netTotal.toFixed(2)}
              className="mt-1 w-full px-3 py-2 rounded-md border-gray-300 bg-gray-100 shadow-sm text-right"
              disabled
            />
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
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add Staff
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffMasterAdd;