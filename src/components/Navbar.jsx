import React from "react";
import { FaGithub } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="flex items-center justify-between px-4 h-14 py-5 mycontainer">
        <div className="logo font-bold text-2xl text-white">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        {/* <ul>
        <li className='flex gap-4'>
          <a className='hover:font-bold' href="">Home</a>
          <a className='hover:font-bold' href="">About</a>
          <a className='hover:font-bold' href="">Contact</a>
        </li>
      </ul> */}
        <button className="mr-8 p-1 rounded-full bg-green-600 flex justify-between gap-3 items-center ring-white ring-1">
          <FaGithub className="text-3xl  " />
          <p className="text-sm font-bold">Github</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
