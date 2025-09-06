import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const demoData = [
  { id: 1, FeeOrderNo: 1, Classcode: 'CL001', ClassName: 'Math 101', FeeType: 'Tuition', FeeName: 'Semester Fee', FeeAmount: 500,  GLCode: 'GL001', DESCRIPT: 'Math course fee', EffectMonth: 'Jan' },
  { id: 2, FeeOrderNo: 2, Classcode: 'CL002', ClassName: 'Physics 101', FeeType: 'Lab', FeeName: 'Lab Fee', FeeAmount: 200,  GLCode: 'GL002', DESCRIPT: 'Physics lab fee', EffectMonth: 'Feb' },
  { id: 3, FeeOrderNo: 3, Classcode: 'CL003', ClassName: 'Chemistry 101', FeeType: 'Tuition', FeeName: 'Course Fee', FeeAmount: 600,  GLCode: 'GL003', DESCRIPT: 'Chemistry course fee', EffectMonth: 'Mar' },
  { id: 4, FeeOrderNo: 4, Classcode: 'CL004', ClassName: 'Biology 101', FeeType: 'Lab', FeeName: 'Lab Equipment', FeeAmount: 150,  GLCode: 'GL004', DESCRIPT: 'Biology lab fee', EffectMonth: 'Apr' },
  { id: 5, FeeOrderNo: 5, Classcode: 'CL005', ClassName: 'History 101', FeeType: 'Tuition', FeeName: 'Semester Fee', FeeAmount: 450,  GLCode: 'GL005', DESCRIPT: 'History course fee', EffectMonth: 'May' },
  { id: 6, FeeOrderNo: 6, Classcode: 'CL006', ClassName: 'Literature 101', FeeType: 'Tuition', FeeName: 'Course Fee', FeeAmount: 400,  GLCode: 'GL006', DESCRIPT: 'Literature course fee', EffectMonth: 'Jun' },
  { id: 7, FeeOrderNo: 7, Classcode: 'CL007', ClassName: 'Art 101', FeeType: 'Material', FeeName: 'Art Supplies', FeeAmount: 100,  GLCode: 'GL007', DESCRIPT: 'Art material fee', EffectMonth: 'Jul' },
];

const Feemastervew = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  // Options for items per page
  const itemsPerPageOptions = [10, 20, 50, 'All'];

  // Calculate filtered data based on search term
  const filteredData = demoData.filter(
    (item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Calculate pagination details
  const totalItems = filteredData.length;
  const totalPages = itemsPerPage === 'All' ? 1 : Math.ceil(totalItems / itemsPerPage);
  const startIndex = itemsPerPage === 'All' ? 0 : (currentPage - 1) * itemsPerPage;
  const currentItems =
    itemsPerPage === 'All'
      ? filteredData
      : filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (id) => {
    console.log(`Edit fee record with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete fee record with ID: ${id}`);
    // Add your delete logic here
  };

  const handleAdd = () => {
    navigate('/master/feemaster/add');
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
        <h2 className="text-2xl font-bold text-gray-800">Fee Master</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search fees..."
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fee Order No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class Code</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fee Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fee Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fee Amount</th>
                         <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">GL Code</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Effect Month</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{item.FeeOrderNo}</td>
                <td className="px-4 py-2 text-gray-800">{item.Classcode}</td>
                <td className="px-4 py-2 text-gray-800">{item.ClassName}</td>
                <td className="px-4 py-2 text-gray-800">{item.FeeType}</td>
                <td className="px-4 py-2 text-gray-800">{item.FeeName}</td>
                <td className="px-4 py-2 text-gray-800">${item.FeeAmount}</td>
               <td className="px-4 py-2 text-gray-800">{item.GLCode}</td>
                <td className="px-4 py-2 text-gray-800">{item.DESCRIPT}</td>
                <td className="px-4 py-2 text-gray-800">{item.EffectMonth}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

export default Feemastervew;