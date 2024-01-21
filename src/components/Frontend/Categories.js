import React, { useState, useEffect } from 'react';
import { useFront } from "../../Context";
import styles from '../../style';

const Categories = () => {
  const [showAllButtons, setShowAllButtons] = useState(false);
  const [buttonsToShow, setButtonsToShow] = useState(18);

  const toggleShowButtons = () => {
    setShowAllButtons(!showAllButtons);
  };
  const {categories, handleCategoryChange, selectedCategory, setSelectedCategory} = useFront();
  
  useEffect(()=>{
    setSelectedCategory([])
  },[]);
  useEffect(() => {
    const handleResize = () => {
      const newButtonsToShow = window.innerWidth > 768 ? 17 : 3; // Adjust these values as needed
      setButtonsToShow(newButtonsToShow);
    };

    handleResize(); // Initial call to set the initial state based on window width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className={`${styles.paddingX}`}>
<div className="flex justify-center items-center">
<hr className='w-[88%] md:mt-7 mt-2' />
</div>
      <div className=" flex items-center justify-center space-x-2 flex-wrap mt-8  ">
        <button className='text-[12px] md:text-[17px]  text-center  rounded-2xl border px-4 items-center hover:bg-[#23CD15] active:bg-[#23CD15] py-1 mb-3  category' onClick={() => setSelectedCategory('')} >All</button>
        {categories?.slice(0, showAllButtons ? categories?.length : buttonsToShow)?.map(category => (
          <button className={`${selectedCategory?.includes(category) ? " bg-[#23CD15]" : "hover:bg-[#23CD15]" } text-center  rounded-2xl border py-1 px-4 md:px-5 mb-3 text-[12px] md:text-[17px] category `} key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </button>
        ))}
        <button className='see-cat' onClick={toggleShowButtons}>
          {showAllButtons ? 'see less...' : 'see more...'}
        </button>
      </div>
  </div>

  )
}

export default Categories