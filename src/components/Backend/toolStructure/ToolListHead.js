import React from 'react'

const ToolListHead = ({type}) => {
  return (
    <ul className=" bg-slate-400 flex flex-row justify-evenly items-center gap-2 p-2 rounded-lg mt-8 h-[6vh] text-white font-medium">
        <li className="w-[2%]">S.No</li>
        <li className="w-[12%] text-center">Name of AI Tool</li>
        <li className="w-[14%] text-center">Category</li>
        {type === 'pluginTool' ? '' : type === 'gptTool' ? '' : <li className="w-[12%] text-center">Image</li>}
        <li className="w-[13%] text-center">Description</li>
        <li className="w-[7%] text-center">Save Count</li>
        <li className="w-[10%] text-center">Website Link</li>
        
        {type === 'pluginTool' ? '' : <li className="w-[10%] text-center">Charges</li>}
        {type === 'aiTool' && <li className="w-[12%] text-center">Add To Top</li>}
        {type === 'aiTool' && <li className="w-[12%] text-center">Add To Featured</li>}
        <li className="w-[6%] text-center">Actions</li>
      </ul>
  )
}

export default ToolListHead;