

import React, { useCallback, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import DashboardNavbar from '../../UserDashBoardComponents/DashNavbar'
import MainDash from '../../UserDashBoardComponents/MainDash';
import NewReportForm from '../../UserDashBoardComponents/NewReport';
import MyReports from '../../UserDashBoardComponents/MyReposts';

const UserDashBoard = () => {
  const [theme, setTheme] = useState('dark');
  
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <>
      <DashboardNavbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        {/* Default dashboard (when just /dashboard/:userId) */}
        <Route path="/" element={<MainDash theme={theme} />} />

        {/* Nested routes */}
        <Route path="new-report" element={<NewReportForm theme={theme} />} />
        <Route path="my-reports" element={<MyReports theme={theme} />} />
      </Routes>
    </>
  )
}

export default UserDashBoard