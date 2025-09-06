import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const demoData = [
  { id: 1, SubjectCode: 'MATH101', SubjectName: 'Mathematics', FullMark: 100, PassMark: 40, AddTotal: true, OrderNo: 1, ClassName: 'Class X', ExamName: 'Midterm Exam' },
  { id: 2, SubjectCode: 'ENG102', SubjectName: 'English', FullMark: 100, PassMark: 40, AddTotal: true, OrderNo: 2, ClassName: 'Class X', ExamName: 'Final Exam' },
  { id: 3, SubjectCode: 'SCI103', SubjectName: 'Science', FullMark: 100, PassMark: 40, AddTotal: true, OrderNo: 3, ClassName: 'Class XI', ExamName: 'Midterm Exam' },
  { id: 4, SubjectCode: 'HIS104', SubjectName: 'History', FullMark: 80, PassMark: 32, AddTotal: false, OrderNo: 4, ClassName: 'Class XI', ExamName: 'Final Exam' },
  { id: 5, SubjectCode: 'GEO105', SubjectName: 'Geography', FullMark: 80, PassMark: 32, AddTotal: false, OrderNo: 5, ClassName: 'Class X', ExamName: 'Midterm Exam' },
  { id: 6, SubjectCode: 'PHY106', SubjectName: 'Physics', FullMark: 100, PassMark: 40, AddTotal: true, OrderNo: 6, ClassName: 'Class XII', ExamName: 'Practical Exam' },
  { id: 7, SubjectCode: 'CHE107', SubjectName: 'Chemistry', FullMark: 100, PassMark: 40, AddTotal: true, OrderNo: 7, ClassName: 'Class XII', ExamName: 'Practical Exam' },
];

const SubjectMasterView = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsPerPageOptions = [10, 20, 50, 'All'];

  useEffect(() => {
    // Simulated API call
    setSubjects(demoData);
  }, []);

  const filteredData = subjects.filter(
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
    console.log(`Edit subject record with ID: ${id}`);
    navigate(`/master/subject/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete subject record with ID: ${id}`);
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  const handleAdd = () => {
    navigate('/master/subjectmaster/add');
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
        <h2 className="text-2xl font-bold text-gray-800">Subject Master</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search subjects..."
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subject Code</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subject Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Full Mark</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Pass Mark</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Add to Total</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Exam Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{item.SubjectCode}</td>
                <td className="px-4 py-2 text-gray-800">{item.SubjectName}</td>
                <td className="px-4 py-2 text-gray-800">{item.FullMark}</td>
                <td className="px-4 py-2 text-gray-800">{item.PassMark}</td>
                <td className="px-4 py-2 text-gray-800">{item.AddTotal ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-gray-800">{item.OrderNo}</td>
                <td className="px-4 py-2 text-gray-800">{item.ClassName}</td>
                <td className="px-4 py-2 text-gray-800">{item.ExamName}</td>
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

export default SubjectMasterView;