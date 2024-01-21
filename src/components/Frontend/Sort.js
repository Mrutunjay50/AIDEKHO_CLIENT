import React from 'react';
import  { ReactComponent as All } from '../../assets/All.svg';
import  { ReactComponent as New } from '../../assets/New.svg';
import  { ReactComponent as Saved } from '../../assets/Saved.svg';
import  { ReactComponent as Alphabetical } from '../../assets/Alphabetical.svg';
import  { ReactComponent as Miner } from '../../assets/Miner.svg';
import  { ReactComponent as Special } from '../../assets/Special.svg';

// Import other sorting options...


// Define an array of corresponding icons (replace with your actual SVG code or PNG image data)
const sortOptions = [
  { label: "All", icon: <All/> },
  { label: "New", icon: <New /> },
  { label: "Most Saved", icon: <Saved/>,},
 { label: "Alphabetical Order", icon: <Alphabetical/>,},
  { label: "Miner's Pick", icon: <Miner/>, },
  {label: "Special Offers", icon: <Special/>, },
  // Add other sorting options with their respective icons
];
const Sort = ({setSelectedSort, selectedSort}) => {


  return (
    // Define your array of words


// Your component code
<div className='w-full mt-6 mb-5 md:mb-0 md:0 '>
  <div className="flex md:items-center md:justify-center mx-2  md:mx-0  space-x-5 md:space-x-6 w-full overflow-x-scroll scrollbar-hide">
    {sortOptions.map(({ label, icon }, index) => (
      <div
        key={index}
        className={`${
          selectedSort === label.replaceAll(" ", "").toLowerCase() && "bg-[#23CD15]"
        } cursor-pointer text-center rounded-md border px-3 mb-3 py-1 hover:bg-[#23CD15] text-white sort`}
        onClick={() => setSelectedSort(label.replaceAll(" ", "").toLowerCase())}
      >
        {/* Display the icon and label inline */}
        <div className="flex items-center w-full">
          <span className="mr-2">{icon}</span>
          <div className='sm:justify-center w-full ' style={{ whiteSpace: 'nowrap' }}>
            {/* Display the label */}
            {label === 'Miners Pick' ? "Miner's Pick" : label}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default Sort