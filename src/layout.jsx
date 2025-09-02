import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/navbar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw', // Use viewport width to prevent overflow
        background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        boxSizing: 'border-box',
        overflowX: 'hidden', // Prevent horizontal overflow
      }}
    >
      {/* Sidebar */}
      <Navbar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          flex: 1,
          width: '100%',
          marginLeft: isSidebarOpen
            ? '0px' // Sidebar open on mobile, no margin
            : isSidebarCollapsed
            ? '80px'
            : '0px',
          transition: 'margin-left 0.3s ease-in-out',
          padding: '0',
          boxSizing: 'border-box',
          maxWidth: 'calc(100vw - (var(--sidebar-width, 280px)))', // Dynamic width
        }}
      >
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          style={{
            display: isSidebarOpen ? 'none' : 'block',
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 1000,
            padding: '8px',
            background: 'linear-gradient(135deg, #111827 0%, #1e40af 100%)',
            color: '#f3f4f6',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Render Children */}
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            isSidebarCollapsed,
            isSidebarOpen,
            toggleSidebar,
          })
        )}
      </motion.div>

      {/* Responsive CSS */}
      <style>
        {`
          :root {
            --sidebar-width: ${isSidebarCollapsed ? '80px' : '280px'};
          }

          /* Mobile (up to 640px) */
          @media (max-width: 640px) {
            div[style*="margin-left"] {
              margin-left: 0 !important;
              padding: 16px !important;
              width: 100vw !important;
              max-width: 100vw !important;
            }
            button[style*="position: fixed"] {
              display: ${isSidebarOpen ? 'none' : 'block'} !important;
            }
          }

          /* Tablet (641px–1024px) */
          @media (min-width: 641px) and (max-width: 1024px) {
            div[style*="margin-left"] {
              margin-left: var(--sidebar-width) !important;
              padding: 20px !important;
              max-width: calc(100vw - var(--sidebar-width)) !important;
            }
            button[style*="position: fixed"] {
              display: ${isSidebarCollapsed ? 'block' : 'none'} !important;
            }
          }

          /* Laptop (1025px and above) */
          @media (min-width: 1025px) {
            div[style*="margin-left"] {
              margin-left: var(--sidebar-width) !important;
              max-width: calc(100vw - var(--sidebar-width)) !important;
            }
            button[style*="position: fixed"] {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;