
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample demo data from ClassTableView and SectionMasterView
const demoClasses = [
  { id: 1, classcode: 'CS101', classname: 'Introduction to Programming' },
  { id: 2, classcode: 'MATH201', classname: 'Calculus I' },
  { id: 3, classcode: 'ENG301', classname: 'Advanced English Literature' },
  { id: 4, classcode: 'PHY102', classname: 'Physics Fundamentals' },
  { id: 5, classcode: 'BIO202', classname: 'Molecular Biology' },
];

const sections = [
  { id: 1, sectionName: 'Section A', classCode: 'CS101', className: 'Introduction to Programming' },
  { id: 2, sectionName: 'Section B', classCode: 'CS102', className: 'Data Structures' },
  { id: 3, sectionName: 'Section C', classCode: 'CS103', className: 'Algorithms' },
  { id: 4, sectionName: 'Section D', classCode: 'CS104', className: 'Operating Systems' },
  { id: 5, sectionName: 'Section E', classCode: 'CS105', className: 'Database Systems' },
  { id: 6, sectionName: 'Section F', classCode: 'CS106', className: 'Web Development' },
  { id: 7, sectionName: 'Section G', classCode: 'CS107', className: 'Software Engineering' },
  { id: 8, sectionName: 'Section H', classCode: 'CS108', className: 'Artificial Intelligence' },
  { id: 9, sectionName: 'Section I', classCode: 'CS109', className: 'Machine Learning' },
  { id: 10, sectionName: 'Section J', classCode: 'CS110', className: 'Computer Networks' },
  { id: 11, sectionName: 'Section K', classCode: 'CS111', className: 'Cybersecurity' },
  { id: 12, sectionName: 'Section L', classCode: 'CS112', className: 'Cloud Computing' },
];

const StudentMasterAdd = () => {
  const navigate = useNavigate();

  // Generate unique AdmissionNo
  const generateAdmissionNo = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `STU${timestamp}${random}`;
  };

  // Form state
  const [formData, setFormData] = useState({
    AdmissionNo: generateAdmissionNo(),
    AdmissionDate: '',
    Session: '',
    ClassName: '',
    Section: '',
    RollNo: '',
    StudentName: '',
    Gender: '',
    BirthDate: '',
    Caste: '',
    Religion: '',
    FatherName: '',
    FOccupation: '',
    FMobile: '',
    MotherName: '',
    MOccupation: '',
    MMobile: '',
    GuardianName: '',
    Relation: '',
    Address1: '',
    Address2: '',
    Address3: '',
    Sports: '',
    Culture: '',
    SchoolBus: '',
    RName: '',
    CRate: '',
    Discount: '',
    Ldate: '',
    InWhichClass: '',
    InClass: '',
    PSchoolName: '',
    BankName: '',
    BBName: '',
    AccountNo: '',
    IFSCCode: '',
    AadharCard: '',
    EMobile: '',
    SMSMobile: '',
    LeaveOutCombo: '',
    MTongue: '',
    HealthId: '',
    IdCutMark: '',
    Panchayat: '',
    District: '',
    Pin: '',
    AFIncome: '',
    GQulification: '',
    Postoffice: '',
    BloodGroup: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/master/classmaster');
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/master/classmaster');
  };

  // Filter sections based on selected ClassName
  const filteredSections = formData.ClassName
    ? sections.filter((section) => section.className === formData.ClassName)
    : sections;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Add New Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Admission Details Section */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Admission Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Admission No
                </label>
                <input
                  type="text"
                  name="AdmissionNo"
                  value={formData.AdmissionNo}
                  readOnly
                  className="w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Admission Date
                </label>
                <input
                  type="date"
                  name="AdmissionDate"
                  value={formData.AdmissionDate}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Session
                </label>
                <input
                  type="text"
                  name="Session"
                  value={formData.Session}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., 2025-2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Class Name
                </label>
                <select
                  name="ClassName"
                  value={formData.ClassName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Class</option>
                  {demoClasses.map((cls) => (
                    <option key={cls.id} value={cls.classname}>
                      {cls.classname}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Section
                </label>
                <select
                  name="Section"
                  value={formData.Section}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Section</option>
                  {filteredSections.map((section) => (
                    <option key={section.id} value={section.sectionName}>
                      {section.sectionName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Roll No
                </label>
                <input
                  type="text"
                  name="RollNo"
                  value={formData.RollNo}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., 001"
                />
              </div>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Student Name
                </label>
                <input
                  type="text"
                  name="StudentName"
                  value={formData.StudentName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Gender
                </label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="BirthDate"
                  value={formData.BirthDate}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Caste
                </label>
                <input
                  type="text"
                  name="Caste"
                  value={formData.Caste}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter caste"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Religion
                </label>
                <input
                  type="text"
                  name="Religion"
                  value={formData.Religion}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter religion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Aadhar Card
                </label>
                <input
                  type="text"
                  name="AadharCard"
                  value={formData.AadharCard}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Aadhar Card Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Identification Cut Mark
                </label>
                <input
                  type="text"
                  name="IdCutMark"
                  value={formData.IdCutMark}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter identification mark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Health ID
                </label>
                <input
                  type="text"
                  name="HealthId"
                  value={formData.HealthId}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Health ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Blood Group
                </label>
                <select
                  name="BloodGroup"
                  value={formData.BloodGroup}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Parent/Guardian Details Section */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Parent/Guardian Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="FatherName"
                  value={formData.FatherName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Father's Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Father's Occupation
                </label>
                <input
                  type="text"
                  name="FOccupation"
                  value={formData.FOccupation}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Father's Occupation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Father's Mobile No
                </label>
                <input
                  type="text"
                  name="FMobile"
                  value={formData.FMobile}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Father's Mobile No"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="MotherName"
                  value={formData.MotherName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Mother's Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Mother's Occupation
                </label>
                <input
                  type="text"
                  name="MOccupation"
                  value={formData.MOccupation}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Mother's Occupation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Mother's Mobile No
                </label>
                <input
                  type="text"
                  name="MMobile"
                  value={formData.MMobile}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Mother's Mobile No"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Guardian Name
                </label>
                <input
                  type="text"
                  name="GuardianName"
                  value={formData.GuardianName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Guardian Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Relation
                </label>
                <input
                  type="text"
                  name="Relation"
                  value={formData.Relation}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Relation to Student"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Guardian Qualification
                </label>
                <input
                  type="text"
                  name="GQulification"
                  value={formData.GQulification}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Guardian Qualification"
                />
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="Address1"
                  value={formData.Address1}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Address Line 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="Address2"
                  value={formData.Address2}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Address Line 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Address Line 3
                </label>
                <input
                  type="text"
                  name="Address3"
                  value={formData.Address3}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Address Line 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  District
                </label>
                <input
                  type="text"
                  name="District"
                  value={formData.District}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter District"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Panchayat / Municipality
                </label>
                <input
                  type="text"
                  name="Panchayat"
                  value={formData.Panchayat}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Panchayat/Municipality"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Post Office
                </label>
                <input
                  type="text"
                  name="Postoffice"
                  value={formData.Postoffice}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Post Office"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="Pin"
                  value={formData.Pin}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Pin Code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Emergency Mobile
                </label>
                <input
                  type="text"
                  name="EMobile"
                  value={formData.EMobile}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Emergency Mobile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  SMS / WhatsApp Mobile
                </label>
                <input
                  type="text"
                  name="SMSMobile"
                  value={formData.SMSMobile}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter SMS/WhatsApp Mobile"
                />
              </div>
            </div>
          </div>

          {/* Other Details Section */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Other Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Sports
                </label>
                <input
                  type="text"
                  name="Sports"
                  value={formData.Sports}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Sports Activities"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Culture
                </label>
                <input
                  type="text"
                  name="Culture"
                  value={formData.Culture}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Cultural Activities"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  School Bus
                </label>
                <select
                  name="SchoolBus"
                  value={formData.SchoolBus}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Route Name
                </label>
                <input
                  type="text"
                  name="RName"
                  value={formData.RName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Route Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Fare Rate
                </label>
                <input
                  type="text"
                  name="CRate"
                  value={formData.CRate}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Fare Rate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Discount
                </label>
                <input
                  type="text"
                  name="Discount"
                  value={formData.Discount}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Discount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Last Date
                </label>
                <input
                  type="date"
                  name="Ldate"
                  value={formData.Ldate}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  In Which Class
                </label>
                <input
                  type="text"
                  name="InWhichClass"
                  value={formData.InWhichClass}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Class"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  In Class
                </label>
                <input
                  type="text"
                  name="InClass"
                  value={formData.InClass}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Class"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Previous School Name
                </label>
                <input
                  type="text"
                  name="PSchoolName"
                  value={formData.PSchoolName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Previous School Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Leave Out
                </label>
                <input
                  type="text"
                  name="LeaveOutCombo"
                  value={formData.LeaveOutCombo}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Leave Out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Mother Tongue
                </label>
                <input
                  type="text"
                  name="MTongue"
                  value={formData.MTongue}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Mother Tongue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Annual Family Income
                </label>
                <input
                  type="text"
                  name="AFIncome"
                  value={formData.AFIncome}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Annual Family Income"
                />
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Bank Details</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="BankName"
                  value={formData.BankName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Bank Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Bank Branch Name
                </label>
                <input
                  type="text"
                  name="BBName"
                  value={formData.BBName}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Bank Branch Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  Account No
                </label>
                <input
                  type="text"
                  name="AccountNo"
                  value={formData.AccountNo}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter Account Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="IFSCCode"
                  value={formData.IFSCCode}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter IFSC Code"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentMasterAdd;
