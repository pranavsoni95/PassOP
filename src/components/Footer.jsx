import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-slate-800 py-[4px] w-full flex flex-col justify-center  text-white items-center">
    <div className="logo font-bold text-2xl text-white">
      <span className="text-green-500">&lt;</span>
      Pass
      <span className="text-green-500">OP/&gt;</span>
    </div>
    <div className='flex'>
      Created with <span className='flex text-red-500 items-center justify-center m-1'><FaHeart/></span> by Pranav Soni

    </div>
    </div>
    
    
  )
}

export default Footer
