import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import  Off_authPage from '../../Off_authPage/Off_AuthPage.jsx';
import DashBoard from './OfficialsDashBoard.jsx';

function App() {
  return (
      <Routes>
        <Route path="/signin" element={<Off_authPage />} />
        <Route path="/signup" element={<Off_authPage />} />
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route 
          path="/dashboard/" 
          element={
              <DashBoard />
          } 
        />
      </Routes>
  );
}

export default App;