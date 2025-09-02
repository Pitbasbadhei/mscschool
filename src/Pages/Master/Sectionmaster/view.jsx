import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionMasterView = () => {
  // Expanded demo data
  const navigate = useNavigate();
  const [sections] = useState([
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
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  // Options for items per page
  const itemsPerPageOptions = [10, 20, 50, 'All'];

  // Calculate filtered sections based on search term
  const filteredSections = sections.filter(
    (section) =>
      section.sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.classCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination details
  const totalItems = filteredSections.length;
  const totalPages = itemsPerPage === 'All' ? 1 : Math.ceil(totalItems / itemsPerPage);
  const startIndex = itemsPerPage === 'All' ? 0 : (currentPage - 1) * itemsPerPage;
  const currentSections =
    itemsPerPage === 'All'
      ? filteredSections
      : filteredSections.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (id) => {
    console.log(`Edit section with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete section with ID: ${id}`);
    // Add your delete logic here
  };

  const handleAdd = () => {
   navigate('/master/sectionmaster/add');
  };

  const handleSearch = () => {
    console.log(`Search for: ${searchTerm}`);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value;
    setItemsPerPage(value === 'All' ? 'All' : parseInt(value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Section Master</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search sections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Section Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class Code</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSections.map((section) => (
              <tr key={section.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{section.sectionName}</td>
                <td className="px-4 py-2 text-gray-800">{section.classCode}</td>
                <td className="px-4 py-2 text-gray-800">{section.className}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(section.id)}
                    className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(section.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
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

export default SectionMasterView;