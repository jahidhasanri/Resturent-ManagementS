import React from "react";
import { CiTimer } from "react-icons/ci";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaSearch,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">

      {/* Left: Logo with clipped right edge */}

      <div className="relative w-[400px] bg-white hidden md:block">
       
        <div className="  flex items-center justify-center h-full py-6 ml-[150px]">
          <img
            src="https://i.ibb.co/BVdGNHP4/logo.png"
            alt="Logo"
            className="h-14"
          />
        </div>
      </div>








      {/* Right: Content Area with clipped left edge */}
      <div
        className="flex flex-col flex-grow bg-black text-white relative"
        style={{
          clipPath: "polygon(2% 0, 100% 0%, 100% 100%, 0% 100%)",
          zIndex: 5,
          // important: no w-full here
        }}
      >

        {/* Top Red Bar */}
        <div className="bg-red-600 text-white text-sm ml-4 px-10 py-5 flex items-center justify-between">
        <div className=" flex items-center justify-between ">
              <div className="flex items-center gap-2">
            <span className="text-lg"><MdOutlineAccessTime /></span>
            <span>09:00 am - 06:00 pm</span>
          </div>
         
        </div>
         <div className="flex items-center gap-3 mr-[150px]">
            <div>
            <span>Follow Us:</span>
            </div>
            <div className="flex items-center gap-5">

            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
            <FaLinkedinIn />
            </div>
          </div>
        </div>

        {/* Bottom Black Navbar */}
        <div className="px-10 py-4 flex justify-between items-center flex-wrap">

          {/* Navigation Menu */}
          <div className="flex gap-6 items-center font-semibold text-sm flex-wrap">
            <span className="hover:text-red-500 cursor-pointer">Home +</span>
            <span className="hover:text-red-500 cursor-pointer">About Us +</span>
            <span className="hover:text-red-500 cursor-pointer">Shop +</span>
            <span className="hover:text-red-500 cursor-pointer">Pages +</span>
            <span className="hover:text-red-500 cursor-pointer">Blog +</span>
            <span className="hover:text-red-500 cursor-pointer">Contact Us +</span>
            <NavLink to={'/login'}>Login</NavLink>
            
          </div>

          {/* Icons + Order Now */}
          <div className="flex items-center gap-7 mt-4 md:mt-0 text-white mr-[150px]">
            <FaSearch className="cursor-pointer" />
            <div className="relative">
              <FaShoppingCart className="text-xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 text-sm flex items-center gap-1 hover:bg-red-700 transition">
              ORDER NOW <FaArrowRight />
            </button>
            {/* Optional Hamburger Icon */}
            <div className="md:hidden text-2xl cursor-pointer">☰</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
