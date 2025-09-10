import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const demoData = [
  { id: 1, LoginId: 'user001', Password: 'pass123', UserName: 'John Smith', MobileNo: '9876543210', SecurityGroup: 'Admin' },
  { id: 2, LoginId: 'user002', Password: 'pass456', UserName: 'Emma Wilson', MobileNo: '8765432109', SecurityGroup: 'Editor' },
  { id: 3, LoginId: 'user003', Password: 'pass789', UserName: 'Michael Brown', MobileNo: '7654321098', SecurityGroup: 'Viewer' },
  { id: 4, LoginId: 'user004', Password: 'pass101', UserName: 'Sarah Davis', MobileNo: '6543210987', SecurityGroup: 'Admin' },
  { id: 5, LoginId: 'user005', Password: 'pass202', UserName: 'David Lee', MobileNo: '5432109876', SecurityGroup: 'Editor' },
  { id: 6, LoginId: 'user006', Password: 'pass303', UserName: 'Laura Martinez', MobileNo: '4321098765', SecurityGroup: 'Viewer' },
  { id: 7, LoginId: 'user007', Password: 'pass404', UserName: 'James Taylor', MobileNo: '3210987654', SecurityGroup: 'Admin' },
];

const UserMasterView = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsPerPageOptions = [10, 20, 50, 'All'];

  useEffect(() => {
    // Simulated API call
    setRecords(demoData);
  }, []);

  const addUser = (newUser) => {
    setRecords((prevRecords) => [...prevRecords, newUser]);
  };

  const filteredData = records.filter(
    (item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalItems = filteredData.length;
  const totalPages = itemsPerPage === 'All' ? 1 : Math.ceil(totalItems / itemsPerPage);
  const startIndex = itemsPerPage === 'All' ? 0 : (currentPage - 1) * itemsPerPage;
  const currentItems =
    itemsPerPage === 'All'
      ? filteredData
      : filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (id) => {
    console.log(`Edit record with ID: ${id}`);
    navigate(`/master/user/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete record with ID: ${id}`);
    setRecords(records.filter((record) => record.id !== id));
  };

  const handleAdd = () => {
    navigate('/Setup/UserMaster/add');
  };

  const handleSearch = () => {
    console.log(`Search for: ${searchTerm}`);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value;
    setItemsPerPage(value === 'All' ? 'All' : parseInt(value));
    setCurrentPage(1);
  };

  return (
    <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Master</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search records..."
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Login ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mobile No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Security Group</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{item.LoginId}</td>
                <td className="px-4 py-2 text-gray-800">{item.UserName}</td>
                <td className="px-4 py-2 text-gray-800">{item.MobileNo}</td>
                <td className="px-4 py-2 text-gray-800">{item.SecurityGroup}</td>
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

export default UserMasterView;