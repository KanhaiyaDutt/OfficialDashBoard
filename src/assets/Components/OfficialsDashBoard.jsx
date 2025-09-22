import React, { useCallback, useState } from 'react'
import MainDash from '../../OfficialDashBoardComponents/MainDash';

const OfficialsDashBoard = () => {
  
      const [theme, setTheme] = useState('dark');

      const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    }, []);
  return (
    <>
    <MainDash theme={theme} toggleTheme={toggleTheme} />
    </>
  )
}

export default OfficialsDashBoard;