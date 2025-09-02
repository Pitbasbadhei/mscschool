import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Dashboard from './components/Dashboard';
import Master from './components/Master';
import Entry from './components/Entry';
import Library from './components/Library';
import Hostel from './components/Hostel';
import Examination from './components/Examination';
import Report from './components/Report';
import Setup from './components/Setup';
import HouseKeep from './components/HouseKeep';
import ClassMaster from  './Pages/Master/Classmaster/add';
import ClassMasterview  from './Pages/Master/Classmaster/view';
import classmasterModify from './Pages/Master/Classmaster/modify';
import Sectionmaster from './Pages/Master/Sectionmaster/add';
import Sectionmasterview from './Pages/Master/Sectionmaster/view';
import Sectionmastermodify from './Pages/Master/Sectionmaster/modify';


const App = () => {
  return (
    
      <Layout>
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/master" element={<Master />} />
            <Route path="/master/classmaster/add" element={<ClassMaster />} />
            <Route path="/master/classmaster/view" element={<ClassMasterview />} />
            <Route path="/master/classmaster/modify" element={<classmasterModify />} />
            
            <Route path="/master/sectionmaster/add" element={<Sectionmaster />} />
            <Route path="/master/sectionmaster/view" element={<Sectionmasterview />} />
            <Route path="/master/sectionmaster/modify" element={<Sectionmastermodify />} />


            <Route path="/entry" element={<Entry />} />
            <Route path="/library" element={<Library />} />
            <Route path="/hostel" element={<Hostel />} />
            <Route path="/examination" element={<Examination />} />
            <Route path="/report" element={<Report />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/housekeep" element={<HouseKeep />} />
          </Routes>
        </div>
      </Layout>
    
  );
};

export default App;