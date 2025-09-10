import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Menu structure based on Navbar.jsx
const defaultMenuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    subItems: [],
  },
  {
    name: 'Master',
    subItems: [
      { name: 'Class Master', path: '/master/classmaster/view' },
      { name: 'Section Master', path: '/master/sectionmaster/view' },
      { name: 'Student Master', path: '/master/studentmaster/view' },
      { name: 'Fee Master', path: '/master/feemaster/view' },
      { name: 'Examination', path: '/master/examination/view' },
      { name: 'Subject Master', path: '/master/subjectmaster/view' },
      { name: 'Conveyance Master', path: '/master/convMaster/view' },
      { name: 'Sport Master', path: '/master/sportmaster/view' },
      { name: 'Staff Master', path: '/master/staffmaster/view' },
      { name: 'User Master', path: '/master/usermaster/view' },
      { name: 'Security Rights', path: '/master/securityrights/view' },
      { name: 'General Ledger', path: '/master/generalledger/view' },
    ],
  },
  {
    name: 'Entry',
    subItems: [
      { name: 'Fee Entry', path: '/entry/fee-entry' },
      { name: 'Voucher', path: '/entry/voucher' },
      { name: 'Sport Fee', path: '/entry/sport-fee' },
      { name: 'MarkSheet', path: '/entry/marksheet' },
    ],
  },
  {
    name: 'Library',
    subItems: [
      { name: 'Book Master', path: '/library/book-master' },
      { name: 'Book Issue / Receive', path: '/library/book-issue-receive' },
      { name: 'Book Register', path: '/library/book-register' },
    ],
  },
  {
    name: 'Hostel',
    subItems: [
      { name: 'Student Master', path: '/hostel/student-master' },
      { name: 'Fee Master', path: '/hostel/fee-master' },
      { name: 'Fee Entry', path: '/hostel/fee-entry' },
    ],
  },
  {
    name: 'Report',
    subItems: [
      {
        name: 'Daily Reports',
        subItems: [
          { name: 'Fee Register', path: '/report/daily/fee-register' },
          { name: 'Attendance Report', path: '/report/daily/attendance-report' },
          { name: 'Daily Collection Report', path: '/report/daily/collection-report' },
          { name: 'Absentee Report', path: '/report/daily/absentee-report' },
          { name: 'Performance Summary', path: '/report/daily/performance-summary' },
        ],
      },
      { name: 'Monthly Reports', path: '/report/monthly-reports' },
      { name: 'Custom Reports', path: '/report/custom-reports' },
    ],
  },
  {
    name: 'Setup',
    subItems: [
      { name: 'Document Number', path: '/setup/document-number' },
      { name: 'Backup Settings', path: '/setup/backup-settings' },
    ],
  },
  {
    name: 'HouseKeep',
    subItems: [
      { name: 'Data Backup', path: '/housekeep/data-backup' },
      { name: 'Data Restore', path: '/housekeep/data-restore' },
    ],
  },
];

const SecurityRightsAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addGroup } = location.state || {};
  const contextMenuRef = useRef(null);

  const [formData, setFormData] = useState({
    GroupCode: '',
    GroupName: '',
    Permissions: {}, // Store permissions as { [path]: { add: boolean, modify: boolean, delete: boolean, view: boolean, explicit: boolean } }
  });
  const [errors, setErrors] = useState({});
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, path: '' });
  const [expandedNodes, setExpandedNodes] = useState({});

  // Initialize permissions with default values for all items
  const initializePermissions = (items, prefix = '') => {
    const permissions = {};
    items.forEach((item) => {
      const itemPath = item.path || `${prefix}/${item.name.toLowerCase().replace(/\s+/g, '-')}`;
      permissions[itemPath] = { add: false, modify: false, delete: false, view: false, explicit: false };
      if (item.subItems?.length > 0) {
        Object.assign(permissions, initializePermissions(item.subItems, itemPath));
      }
    });
    return permissions;
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      Permissions: initializePermissions(defaultMenuItems),
    }));
  }, []);

  // Collect all sub-item paths recursively
  const collectSubItemPaths = (items, prefix = '') => {
    const paths = [];
    items.forEach((item) => {
      const itemPath = item.path || `${prefix}/${item.name.toLowerCase().replace(/\s+/g, '-')}`;
      paths.push(itemPath);
      if (item.subItems?.length > 0) {
        paths.push(...collectSubItemPaths(item.subItems, itemPath));
      }
    });
    return paths;
  };

  // Handle checkbox changes and propagate to sub-items
  const handlePermissionChange = (path, type, items = defaultMenuItems) => {
    setFormData((prev) => {
      const newPermissions = { ...prev.Permissions };
      const subItemPaths = items
        .filter((item) => item.path === path || `${item.name.toLowerCase().replace(/\s+/g, '-')}` === path.split('/').pop())
        .flatMap((item) => collectSubItemPaths(item.subItems || [], path));

      // Update the selected path with explicit: true
      newPermissions[path] = {
        ...newPermissions[path],
        [type]: !newPermissions[path][type],
        explicit: true,
      };

      // Propagate to sub-items with explicit: false
      subItemPaths.forEach((subPath) => {
        newPermissions[subPath] = {
          ...newPermissions[subPath],
          [type]: newPermissions[path][type],
          explicit: false, // Sub-items inherit without being explicit
        };
      });

      return {
        ...prev,
        Permissions: newPermissions,
      };
    });
  };

  // Handle right-click context menu
  const handleContextMenu = (e, path) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      path,
    });
  };

  // Handle context menu actions and propagate to sub-items
  const handleContextMenuAction = (action) => {
    setFormData((prev) => {
      const newPermissions = { ...prev.Permissions };
      const subItemPaths = defaultMenuItems
        .filter((item) => item.path === contextMenu.path || `${item.name.toLowerCase().replace(/\s+/g, '-')}` === contextMenu.path.split('/').pop())
        .flatMap((item) => collectSubItemPaths(item.subItems || [], contextMenu.path));

      // Update the selected path with explicit: true
      newPermissions[contextMenu.path] = {
        add: action === 'grantAll',
        modify: action === 'grantAll',
        delete: action === 'grantAll',
        view: action === 'grantAll',
        explicit: true,
      };

      // Propagate to sub-items with explicit: false
      subItemPaths.forEach((subPath) => {
        newPermissions[subPath] = {
          add: action === 'grantAll',
          modify: action === 'grantAll',
          delete: action === 'grantAll',
          view: action === 'grantAll',
          explicit: false, // Sub-items inherit without being explicit
        };
      });

      return {
        ...prev,
        Permissions: newPermissions,
      };
    });
    setContextMenu({ visible: false, x: 0, y: 0, path: '' });
  };

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu({ visible: false, x: 0, y: 0, path: '' });
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.GroupCode.trim()) newErrors.GroupCode = 'Group Code is required';
    if (!formData.GroupName.trim()) newErrors.GroupName = 'Group Name is required';
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
      const newGroup = {
        id: Date.now(), // Simple unique ID; replace with UUID in production
        GroupCode: formData.GroupCode,
        GroupName: formData.GroupName,
        Permissions: formData.Permissions,
      };
      if (addGroup) {
        addGroup(newGroup);
      }
      navigate('/master/securityrights');
    }
  };

  const handleCancel = () => {
    navigate('/master/securityrights');
  };

  // Toggle submenu expansion
  const toggleSubmenu = (path) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // Recursive component to render tree structure
  const TreeNode = ({ item, level = 0, prefix = '' }) => {
    const itemPath = item.path || `${prefix}/${item.name.toLowerCase().replace(/\s+/g, '-')}`;
    const isExpanded = expandedNodes[itemPath];
    const isHighlighted = formData.Permissions[itemPath]?.explicit &&
      (formData.Permissions[itemPath]?.add || 
       formData.Permissions[itemPath]?.modify || 
       formData.Permissions[itemPath]?.delete || 
       formData.Permissions[itemPath]?.view);

    return (
      <div className={`ml-${level * 4}`}>
        <div
          className={`flex items-center py-1 px-2 rounded-md ${isHighlighted ? 'bg-blue-100' : ''}`}
          onContextMenu={(e) => handleContextMenu(e, itemPath)}
        >
          {item.subItems?.length > 0 && (
            <button
              type="button"
              onClick={() => toggleSubmenu(itemPath)}
              className="mr-2 text-gray-600 hover:text-gray-800"
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
          <span className="text-gray-900 text-sm font-bold">{item.name}</span>
          <div className="ml-auto flex space-x-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.Permissions[itemPath]?.add || false}
                onChange={() => handlePermissionChange(itemPath, 'add', defaultMenuItems)}
                className="mr-1 accent-black"
              />
              Add
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.Permissions[itemPath]?.modify || false}
                onChange={() => handlePermissionChange(itemPath, 'modify', defaultMenuItems)}
                className="mr-1 accent-blue-500"
              />
              Modify
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.Permissions[itemPath]?.delete || false}
                onChange={() => handlePermissionChange(itemPath, 'delete', defaultMenuItems)}
                className="mr-1 accent-red-500"
              />
              Delete
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.Permissions[itemPath]?.view || false}
                onChange={() => handlePermissionChange(itemPath, 'view', defaultMenuItems)}
                className="mr-1 accent-green-500"
              />
              View
            </label>
          </div>
        </div>
        {item.subItems?.length > 0 && isExpanded && (
          <div className="ml-4">
            {item.subItems.map((subItem, index) => (
              <TreeNode
                key={`${item.name}-${index}`}
                item={subItem}
                level={level + 1}
                prefix={itemPath}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Security Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <div className="mb-4">
            <label htmlFor="GroupCode" className="block text-sm font-medium text-gray-700">
              Group Code
            </label>
            <input
              type="text"
              id="GroupCode"
              name="GroupCode"
              value={formData.GroupCode}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.GroupCode ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., GRP008"
            />
            {errors.GroupCode && <p className="text-red-500 text-sm mt-1">{errors.GroupCode}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="GroupName" className="block text-sm font-medium text-gray-700">
              Group Name
            </label>
            <input
              type="text"
              id="GroupName"
              name="GroupName"
              value={formData.GroupName}
              onChange={handleChange}
              className={`mt-1 w-full px-3 py-2 rounded-md border ${errors.GroupName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
              placeholder="e.g., Supervisor"
            />
            {errors.GroupName && <p className="text-red-500 text-sm mt-1">{errors.GroupName}</p>}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700">Permissions</div>
          <div className="mt-1 max-h-64 overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
            {defaultMenuItems.map((item, index) => (
              <TreeNode key={item.name} item={item} level={0} />
            ))}
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
            Add Group
          </button>
        </div>
      </form>
      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className="fixed bg-white border border-gray-300 rounded-md shadow-lg z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => handleContextMenuAction('grantAll')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
          >
            Grant All
          </button>
          <button
            onClick={() => handleContextMenuAction('revokeAll')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
          >
            Revoke All
          </button>
        </div>
      )}
    </div>
  );
};

export default SecurityRightsAdd;