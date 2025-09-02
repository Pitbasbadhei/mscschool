
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { path } from 'framer-motion/client';

// Define nav item shape for PropTypes
const navItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string, // Optional for top-level items with subItems
  subItems: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        subItems: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
          })
        ).isRequired,
      }),
    ])
  ).isRequired,
  icon: PropTypes.node.isRequired,
});

// SVG Icons (unchanged)
const icons = {
  dashboard: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  master: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  entry: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  library: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  hotel: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  examination: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  report: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  setup: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
    </svg>
  ),
  houseKeep: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  collapse: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      subItems: [{name:'Home',path:'/'}],
      icon: icons.dashboard,
    },
    {
      name: 'Master',
      subItems: [
        { name: 'Class Master', path: '/master/classmaster/view' },
        { name: 'Section Master', path: '/master/sectionmaster/view' },
        { name: 'Student Master', path: '/master/studentmaster' },
        { name: 'Fee Master', path: '/master/feemaster' },
        { name: 'Examination', path: '/master/examination' },
        { name: 'Subject Master', path: '/master/subjectmaster' },
        { name: 'Conveyance Master', path: '/master/conveyancemaster' },
        { name: 'Sport Master', path: '/master/sportmaster' },
        { name: 'Staff Master', path: '/master/staffmaster' },
        { name: 'General Ledger', path: '/master/generalledger' },
      ],
      icon: icons.master,
    },
    {
      name: 'Entry',
      subItems: [
        { name: 'Fee Entry', path: '/entry/fee-entry' },
        { name: 'Voucher', path: '/entry/voucher' },
        { name: 'Sport Fee', path: '/entry/sport-fee' },
        { name: 'MarkSheet', path: '/entry/marksheet' },
      ],
      icon: icons.entry,
    },
    {
      name: 'Library',
      subItems: [
        { name: 'Book Master', path: '/library/book-master' },
        { name: 'Book Issue / Receive', path: '/library/book-issue-receive' },
        { name: 'Book Register', path: '/library/book-register' },
      ],
      icon: icons.library,
    },
    {
      name: 'Hostel',
      subItems: [
        { name: 'Student Master', path: '/hostel/student-master' },
        { name: 'Fee Master', path: '/hostel/fee-master' },
        { name: 'Fee Entry', path: '/hostel/fee-entry' },
      ],
      icon: icons.hotel,
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
      icon: icons.report,
    },
    {
      name: 'Setup',
      subItems: [
        { name: 'User Master', path: '/setup/user-master' },
        { name: 'Security Rights', path: '/setup/security-rights' },
        { name: 'Document Number', path: '/setup/document-number' },
      ],
      icon: icons.setup,
    },
    {
      name: 'HouseKeep',
      subItems: [
        { name: 'Data Backup', path: '/housekeep/data-backup' },
        { name: 'Data Restore', path: '/housekeep/data-restore' },
      ],
      icon: icons.houseKeep,
    },
  ];

  const toggleSubmenu = useCallback((index) => {
    console.log(`Toggling submenu: ${index}`);
    setOpenSubmenu((prev) => (prev === index ? null : index));
  }, []);

  const toggleMenu = useCallback(() => {
    console.log(`Toggling mobile menu: ${!isOpen}`);
    setIsOpen((prev) => !prev);
  }, []);

  const toggleCollapse = useCallback(() => {
    console.log(`Toggling collapse: ${!collapsed}`);
    setCollapsed((prev) => !prev);
    setOpenSubmenu(null); // Close all submenus when collapsing
  }, []);

  return (
    <div
      style={{
        width: collapsed ? '80px' : isOpen ? '280px' : '280px',
        backgroundColor: '#01516e',
        color: '#f3f4f6',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: collapsed ? '20px 10px' : '20px 10px',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '16px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 30,
        transition: 'width 0.3s ease-in-out',
        overflowY: 'auto',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Top: Logo and Toggle */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 30,
            paddingLeft: collapsed ? 0 : 10,
            cursor: 'pointer',
          }}
          onClick={() => alert('Brand clicked')}
        >
          <div
            style={{
              color: '#22d3ee',
              fontSize: '30px',
              fontWeight: 'bold',
              marginRight: collapsed ? 0 : 10,
            }}
          >
            ⚡
          </div>
          {!collapsed && (
            <div style={{ fontWeight: 'bold', fontSize: '30px' }}>H-SCHOOL</div>
          )}
        </div>

        {/* Menu */}
        <nav style={{ marginBottom: 20 }}>
          {navItems.map((item, index) => (
            <div key={item.name}>
              <div
                onClick={() => toggleSubmenu(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: collapsed ? '10px 0' : '10px 20px',
                  cursor: 'pointer',
                  backgroundColor: openSubmenu === index ? '#2563eb' : 'transparent',
                  color: openSubmenu === index ? 'white' : '#edb009',
                  borderRadius: 6,
                  marginBottom: 6,
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  fontWeight: openSubmenu === index ? '600' : '400',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                title={collapsed ? item.name : ''}
                onMouseEnter={(e) => {
                  if (openSubmenu !== index && !collapsed) {
                    e.currentTarget.style.backgroundColor = '#1e40af';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (openSubmenu !== index && !collapsed) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#9ca3af';
                  }
                }}
                aria-expanded={openSubmenu === index}
                aria-controls={`submenu-${index}`}
              >
                <div
                  style={{
                    minWidth: 24,
                    minHeight: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </div>
                {!collapsed && (
                  <>
                    <span style={{ marginLeft: 16 }}>{item.name}</span>
                    {item.subItems.length > 0 && (
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        style={{
                          marginLeft: 'auto',
                          transform: openSubmenu === index ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                        }}
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </>
                )}
              </div>
              <div
                id={`submenu-${index}`}
                style={{
                  paddingLeft: collapsed ? 0 : 40,
                  overflow: 'hidden',
                  height: openSubmenu === index ? 'auto' : 0,
                  opacity: openSubmenu === index ? 1 : 0,
                  transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                }}
                role="region"
                aria-hidden={openSubmenu !== index}
              >
                {item.subItems.map((subItem, subIndex) => (
                  <div key={`${item.name}-${subIndex}`}>
                    {typeof subItem === 'object' && !subItem.subItems ? (
                      <a
                        href={subItem.path}
                        style={{
                          display: 'block',
                          padding: collapsed ? '8px 0' : '8px 20px',
                          color: '#9ca3af',
                          borderRadius: 6,
                          marginBottom: 4,
                          fontSize: '13px',
                          transition: 'background-color 0.3s, color 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          if (!collapsed) {
                            e.currentTarget.style.backgroundColor = '#1e40af';
                            e.currentTarget.style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!collapsed) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#9ca3af';
                          }
                        }}
                      >
                        {subItem.name}
                      </a>
                    ) : (
                      <div>
                        <div
                          onClick={() => toggleSubmenu(`${index}-${subIndex}`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: collapsed ? '8px 0' : '8px 20px',
                            color: openSubmenu === `${index}-${subIndex}` ? 'white' : '#9ca3af',
                            cursor: 'pointer',
                            backgroundColor: openSubmenu === `${index}-${subIndex}` ? '#1e40af' : 'transparent',
                            borderRadius: 6,
                            marginBottom: 4,
                            fontSize: '13px',
                            transition: 'background-color 0.3s, color 0.3s',
                          }}
                          onMouseEnter={(e) => {
                            if (openSubmenu !== `${index}-${subIndex}` && !collapsed) {
                              e.currentTarget.style.backgroundColor = '#1e40af';
                              e.currentTarget.style.color = 'white';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (openSubmenu !== `${index}-${subIndex}` && !collapsed) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#9ca3af';
                            }
                          }}
                          aria-expanded={openSubmenu === `${index}-${subIndex}`}
                          aria-controls={`submenu-${index}-${subIndex}`}
                        >
                          <span>{subItem.name}</span>
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                            style={{
                              marginLeft: 'auto',
                              transform: openSubmenu === `${index}-${subIndex}` ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s',
                            }}
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <div
                          id={`submenu-${index}-${subIndex}`}
                          style={{
                            paddingLeft: collapsed ? 0 : 60,
                            overflow: 'hidden',
                            height: openSubmenu === `${index}-${subIndex}` ? 'auto' : 0,
                            opacity: openSubmenu === `${index}-${subIndex}` ? 1 : 0,
                            transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                          }}
                          role="region"
                          aria-hidden={openSubmenu !== `${index}-${subIndex}`}
                        >
                          {subItem.subItems.map((nestedSubItem, nestedIndex) => (
                            <a
                              key={`${item.name}-${subItem.name}-${nestedSubItem.name}-${nestedIndex}`}
                              href={nestedSubItem.path}
                              style={{
                                display: 'block',
                                padding: collapsed ? '8px 0' : '8px 20px',
                                color: '#9ca3af',
                                borderRadius: 6,
                                marginBottom: 4,
                                fontSize: '12px',
                                transition: 'background-color 0.3s, color 0.3s',
                              }}
                              onMouseEnter={(e) => {
                                if (!collapsed) {
                                  e.currentTarget.style.backgroundColor = '#1e40af';
                                  e.currentTarget.style.color = 'white';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!collapsed) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#9ca3af';
                                }
                              }}
                            >
                              {nestedSubItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom: Collapse Button */}
      <div>
        <div style={{ borderTop: '1px solid #374151', paddingTop: 20, marginBottom: 20 }}>
          <button
            onClick={toggleCollapse}
            style={{
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: collapsed ? 20 : 10,
              fontWeight: 'bold',
              fontSize:16,
              width: '100%',
            }}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {icons.collapse}
            {!collapsed && <span style={{ marginLeft: 8 }}>Collapse Sidebar</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 20,
            display: 'block',
          }}
          onClick={toggleMenu}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

Navbar.propTypes = {
  navItems: PropTypes.arrayOf(navItemShape),
};

export default React.memo(Navbar);
