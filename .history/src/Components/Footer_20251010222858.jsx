import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0B1017] text-white relative md: px-6">

      {/* Floating images */}
      <div className="bg-orange-500/60 relative z-20">
        <img
          src="/images/437-4378461_left-vignette-burger-png-lettuce-leaf.png"
          alt=""
          className="w-[100px] sm:w-[120px] absolute lx:mt-[80px]  md:mt-[200px] mt-[300px] animate-float"
        />
      </div>

      <div className="relative z-20">
        <img
          src="/images/footerShape1_4.webp"
          alt=""
          className="w-[100px] sm:w-[120px] absolute right-0 top-0"
        />
      </div>

      <div className='container mx-auto pt-[80px] sm:pt-[100px] px-4 sm:px-0'>

        {/* Top Contact Strip */}
        <div className="bg-orange-500 w-full sm:w-10/12 mx-auto text-white py-6 px-4 sm:px-20 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 rounded-2xl">
          <div className="flex items-center gap-2 sm:gap-3 py-3 sm:py-5">
            <span className="text-xl sm:text-2xl">📍</span>
            <div>
              <p className="text-xs sm:text-sm">Address</p>
              <p className="text-sm sm:text-lg font-semibold">4648 Rocky Road Philadelphia</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 py-3 sm:py-5">
            <span className="text-xl sm:text-2xl">✉️</span>
            <div>
              <p className="text-xs sm:text-sm">Send Email</p>
              <p className="text-sm sm:text-lg font-semibold">info@exmple.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 py-3 sm:py-5">
            <span className="text-xl sm:text-2xl">📞</span>
            <div>
              <p className="text-xs sm:text-sm">Call Emergency</p>
              <p className="text-sm sm:text-lg font-semibold">+88 0123 654 99</p>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 px-2 sm:px-0 py-16 relative">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-orange-500 border-t-4 border-orange-500 inline-block mr-2 w-10"></span>
              FRESHEAT
            </h2>
            <p className="text-sm text-gray-400 mt-4">
              Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur lacinia mollis
            </p>
            <div className="flex gap-2 sm:gap-3 mt-5">
              <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaFacebookF /></button>
              <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaTwitter /></button>
              <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaLinkedinIn /></button>
              <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaYoutube /></button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>» About Us</li>
              <li>» Our Gallery</li>
              <li>» Our Blogs</li>
              <li>» FAQ’S</li>
              <li>» Contact Us</li>
            </ul>
          </div>

          {/* Our Menu */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Our Menu</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>» Burger King</li>
              <li>» Pizza King</li>
              <li>» Fresh Food</li>
              <li>» Vegetable</li>
              <li>» Desserts</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-xs sm:text-sm mb-1 text-gray-400">Monday – Friday: <span className="text-orange-500">8am – 4pm</span></p>
            <p className="text-xs sm:text-sm mb-3 text-gray-400">Saturday: <span className="text-orange-500">8am – 12am</span></p>
            <div className="flex items-center bg-white rounded overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                className="px-2 sm:px-3 py-2 w-full outline-none text-black text-xs sm:text-sm"
              />
              <button className="bg-orange-500 px-3 sm:px-4 py-2 sm:py-2">
                <FaArrowRight  />
              </button>
            </div>
            <div className="mt-2 text-xs sm:text-sm text-gray-400">
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" className="accent-orange-500" />
                I agree to the <a href="#" className="underline text-white">Privacy Policy</a>.
              </label>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="bg-red-600 text-white">
          <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-20 py-4 text-sm gap-2 sm:gap-0'>
            <p>© All Copyright 2024 by FreshEat</p>
            <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
              <button className="bg-white text-black px-3 py-1 rounded hover:bg-orange-500 hover:text-white">Terms & Condition</button>
              <button className="bg-white text-black px-3 py-1 rounded hover:bg-orange-500 hover:text-white">Privacy Policy</button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
