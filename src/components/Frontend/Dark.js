import React from 'react'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from '../../Context/ThemeContext';


const Dark = () => {
    const [theme, setTheme] = useTheme();  
    const handleTheme = () => {
      setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
    }; 
  return (
    <>
 <div className="theme-btn" onClick={handleTheme}>
          {theme === "light" ? (
            <BsFillMoonStarsFill size={30} color='#ffffff' />
          ) : (
            <BsFillSunFill size={30} color='#ffffff' />
          )}
        </div>
        
    </>
  )
}

export default Dark