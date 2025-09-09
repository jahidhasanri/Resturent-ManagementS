import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0B1017] text-white ">
      <div className="bg-orange-500/60 relative z-20 ">
  <img
    src="/images/437-4378461_left-vignette-burger-png-lettuce-leaf.png"
    alt=""
    className="w-[120px] absolute mt-[130px] animate-float"
  />
  
</div>

 <div className=" relative z-20 ">
  <img
    src="/images/footerShape1_4.webp"
    alt=""
    className="w-[120px] absolute right-0 "
  />
</div>
        <div className='container mx-auto pt-[100px]'>
            <div className="bg-orange-500  w-10/12 mx-auto text-white py-6 px-4 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6 rounded-2xl">
        <div className="flex items-center gap-3 py-5">
          <span className="text-2xl">📍</span>
          <div>
            <p className="text-sm">Address</p>
            <p className="text-lg font-semibold">4648 Rocky Road Philadelphia</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">✉️</span>
          <div>
            <p className="text-sm">Send Email</p>
            <p className="text-lg font-semibold">info@exmple.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📞</span>
          <div>
            <p className="text-sm">Call Emergency</p>
            <p className="text-lg font-semibold">+88 0123 654 99</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-2 py-16 relative">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-orange-500 border-t-4 border-orange-500 inline-block mr-2 w-10"></span>
            FRESHEAT
          </h2>
          <p className="text-sm text-gray-400 mt-4">
            Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur lacinia mollis
          </p>
          <div className="flex gap-3 mt-5">
            <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaFacebookF /></button>
            <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaTwitter /></button>
            <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaLinkedinIn /></button>
            <button className="bg-white text-black p-2 rounded-sm hover:bg-orange-500 hover:text-white"><FaYoutube /></button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-base">
            <li>» About Us</li>
            <li>» Our Gallery</li>
            <li>» Our Blogs</li>
            <li>» FAQ’S</li>
            <li>» Contact Us</li>
          </ul>
        </div>

        {/* Our Menu */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Menu</h3>
          <ul className="space-y-2 text-base">
            <li>» Burger King</li>
            <li>» Pizza King</li>
            <li>» Fresh Food</li>
            <li>» Vegetable</li>
            <li>» Desserts</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2 text-gray-400">Monday – Friday: <span className="text-orange-500">8am – 4pm</span></p>
          <p className="text-sm mb-4 text-gray-400">Saturday: <span className="text-orange-500">8am – 12am</span></p>
          <div className="flex items-center bg-white rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 w-full outline-none text-black"
            />
            <button className="bg-orange-500 px-4 ">
              <FaArrowRight  />
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" className="accent-orange-500" />
              I agree to the <a href="#" className="underline text-white">Privacy Policy</a>.
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      
        </div>
        <div className="bg-red-600 text-white ">
        <div className='container mx-auto flex justify-between items-center px-6 md:px-20 py-4  text-sm'>
            <p>© All Copyright 2024 by FreshEat</p>
        <div className="flex gap-3 mt-2 md:mt-0">
          <button className="bg-white text-black px-3 py-1 rounded hover:bg-orange-500 hover:text-white">Terms & Condition</button>
          <button className="bg-white text-black px-3 py-1 rounded hover:bg-orange-500 hover:text-white">Privacy Policy</button>
        </div>
        </div>
      </div>

      {/* Scroll To Top Button */}
      {/* <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all">
          ↑
        </button>
      </div>  */}
      {/* Top Contact Strip */}
      
    </footer>
  );
};

export default Footer;
