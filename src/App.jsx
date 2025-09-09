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

import StudentMasterAdd  from './Pages/Master/Studentmaster/add';
import StudentMasterView  from './Pages/Master/Studentmaster/view';   
import StudentMasterModify  from './Pages/Master/Studentmaster/modify';

import Feemastervew from './Pages/Master/Feemaster/view';
import FeeMasterAdd from './Pages/Master/Feemaster/add';
import FeeMasterModify from './Pages/Master/Feemaster/modify';

import Examinationview from './Pages/Master/Examination/view';
import ExaminationAdd from './Pages/Master/Examination/add';
import ExaminationModify from './Pages/Master/Examination/modify';

import Subjectmasterview from './Pages/Master/Subjectmaster/view';
import Subjectmasteradd from './Pages/Master/Subjectmaster/add';
import Subjectmastermodify from './Pages/Master/Subjectmaster/modify';

import Convmasterview from './Pages/Master/ConvMaster/view';
import Convmasteradd from './Pages/Master/ConvMaster/add';
import Convmastermodify from './Pages/Master/ConvMaster/modify';

import SportMasterview from './Pages//master/SportMaster/view';
import SportMasteradd from './Pages/Master/SportMaster/add';
import SportMastermodify from './Pages/Master/SportMaster/modify';

import StaffMasterview from './Pages/Master/StaffMaster/view';
import StaffMasteradd from './Pages/Master/StaffMaster/add';
import StaffMastermodify from './Pages/Master/StaffMaster/modify';
  



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

            <Route path="/master/Studentmaster/add" element={<StudentMasterAdd/>} /> 
            <Route path="/master/Studentmaster/view" element={<StudentMasterView />} />
            <Route path="/master/Studentmaster/modify" element={<StudentMasterModify />} />

            <Route path="/master/FeeMaster/view" element={<Feemastervew />} />
            <Route path="/master/Feemaster/add" element={<FeeMasterAdd />} />
            <Route path="/master/Feemaster/modify" element={<FeeMasterModify />} />

             <Route path="/master/Examination/view" element={<Examinationview />} />  
            <Route path="/master/Examination/add" element={<ExaminationAdd />} />
            <Route path="/master/Examination/modify" element={<ExaminationModify />} />

            <Route path="/master/Subjectmaster/view" element={<Subjectmasterview />} />
            <Route path="/master/Subjectmaster/add" element={<Subjectmasteradd />} />
            <Route path="/master/Subjectmaster/modify" element={<Subjectmastermodify />} />

            <Route path="/master/convMaster/view" element={<Convmasterview />} />
            <Route path="/master/convMaster/add" element={<Convmasteradd />} />
            <Route path="/master/convMaster/modify" element={<Convmastermodify />} />

            <Route path="/master/SportMaster/view" element={<SportMasterview />} />
            <Route path="/master/SportMaster/add" element={<SportMasteradd />} />
            <Route path="/master/SportMaster/modify" element={<SportMastermodify />} />

            <Route path="/master/Staffmaster/view" element={<StaffMasterview />} />
            <Route path="/master/Staffmaster/add" element={<StaffMasteradd />} />
            <Route path="/master/Staffmaster/modify" element={<StaffMastermodify />} />


         
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