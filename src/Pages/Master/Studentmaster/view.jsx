import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample demo data for students
const demoStudents = [
  { id: 1, AdmissionNo: 'STU1234567890', StudentName: 'John Doe', ClassName: 'Introduction to Programming', Section: 'Section A', RollNo: '001' },
  { id: 2, AdmissionNo: 'STU1234567891', StudentName: 'Jane Smith', ClassName: 'Calculus I', Section: 'Section B', RollNo: '002' },
  { id: 3, AdmissionNo: 'STU1234567892', StudentName: 'Alice Johnson', ClassName: 'Advanced English Literature', Section: 'Section C', RollNo: '003' },
  { id: 4, AdmissionNo: 'STU1234567893', StudentName: 'Bob Wilson', ClassName: 'Physics Fundamentals', Section: 'Section D', RollNo: '004' },
  { id: 5, AdmissionNo: 'STU1234567894', StudentName: 'Emma Brown', ClassName: 'Molecular Biology', Section: 'Section E', RollNo: '005' },
  { id: 6, AdmissionNo: 'STU1234567895', StudentName: 'Michael Lee', ClassName: 'Web Development', Section: 'Section F', RollNo: '006' },
  { id: 7, AdmissionNo: 'STU1234567896', StudentName: 'Sarah Davis', ClassName: 'Software Engineering', Section: 'Section G', RollNo: '007' },
  { id: 8, AdmissionNo: 'STU1234567897', StudentName: 'David Clark', ClassName: 'Artificial Intelligence', Section: 'Section H', RollNo: '008' },
  { id: 9, AdmissionNo: 'STU1234567898', StudentName: 'Laura Martinez', ClassName: 'Machine Learning', Section: 'Section I', RollNo: '009' },
  { id: 10, AdmissionNo: 'STU1234567899', StudentName: 'James White', ClassName: 'Computer Networks', Section: 'Section J', RollNo: '010' },
];

// Sample demo data from ClassTableView and SectionMasterView for reference
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
];

const StudentMasterView = () => {
  const navigate = useNavigate();
  const [students] = useState(demoStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [filteredStudents, setFilteredStudents] = useState(demoStudents);

  // Options for items per page
  const itemsPerPageOptions = [10, 20, 50, 'All'];

  // Handle search
  const handleSearch = () => {
    const filtered = students.filter(
      (student) =>
        student.AdmissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.StudentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.ClassName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.RollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredStudents(students); // Reset to all students if search is cleared
      setCurrentPage(1);
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle add
  const handleAdd = () => {
    navigate('/master/studentmaster/add');
  };

  // Handle editing a student
  const handleEdit = (id) => {
    console.log(`Edit student with ID: ${id}`);
    // Implement edit logic (e.g., navigate to edit form)
  };

  // Handle deleting a student
  const handleDelete = (id) => {
    console.log(`Delete student with ID: ${id}`);
    // Implement delete logic
  };

  // Calculate pagination details
  const totalItems = filteredStudents.length;
  const totalPages = itemsPerPage === 'All' ? 1 : Math.ceil(totalItems / itemsPerPage);
  const startIndex = itemsPerPage === 'All' ? 0 : (currentPage - 1) * itemsPerPage;
  const currentRows =
    itemsPerPage === 'All'
      ? filteredStudents
      : filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === 'All' ? 'All' : parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Master</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="px-3 py-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            <button
              onClick={handleSearch}
              className="ml-2 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Search
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Admission No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Section</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Roll No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{student.AdmissionNo}</td>
                <td className="px-4 py-2 text-gray-800">{student.StudentName}</td>
                <td className="px-4 py-2 text-gray-800">{student.ClassName}</td>
                <td className="px-4 py-2 text-gray-800">{student.Section}</td>
                <td className="px-4 py-2 text-gray-800">{student.RollNo}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No students found.</p>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + (itemsPerPage === 'All' ? totalItems : itemsPerPage), totalItems)} of {totalItems} entries
          </div>
          <div className="flex items-center">
            <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-600">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-3 py-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {itemsPerPage !== 'All' && (
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMasterView;