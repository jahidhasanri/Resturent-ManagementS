import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { FaPhone } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import GetinTouch from '../Components/GetinTouch';
import Map from '../Components/Map';

const ContactUs = () => {
    return (
      <div className='bg-[#f4f1ea]'>
          <div 
            style={{
                backgroundImage: "url('/images/breadcumb.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "50vh",
                width: "100%"
            }}
        >
            <h1 className='font-bold text-center pt-[150px] text-[60px] text-white'>
                CONTACT US
            </h1>
        </div>

           <div className='container px-2 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-[30px] xl:pt-[122px] xl:pb-[122px]'>
                
                <div className="bg-white border-[1px] border-red-500 p-4 rounded-lg shadow-md">
                    <div className='bg-[#f4f1ea] border-[1px] border-red-500 p-4 rounded-lg shadow-md w-[70px] mt-[20px] h-[70px] mx-auto'><IoLocationOutline className='text-red-700 w-[40px] h-[40px] mr-2' /></div>
                <h1 className="text-[26px] font-bold mb-2 mt-4 text-center">Our Address</h1>
                <h5 className="text-gray-600 text-[17px] text-center mb-[20px]">4517 Washington Ave. Manchester, Kentucky 39495</h5>
                </div>

                <div className="bg-white border-[1px] border-red-500 p-4 rounded-lg shadow-md">
                    <div className='bg-[#f4f1ea] border-[1px] border-red-500 p-4 rounded-lg shadow-md w-[70px] mt-[20px] h-[70px] mx-auto'><TfiEmail  className='text-red-700 w-[40px] h-[40px] mr-2' /></div>
                <h1 className="text-[26px] font-bold mb-2 mt-4 text-center">info@exmple.com</h1>
                <h5 className="text-gray-600 text-[17px] text-center mb-[20px]">Email us anytime for any kind ofquety.</h5>
                </div>

                <div className="bg-white border-[1px] border-red-500 p-4 rounded-lg shadow-md">
                    <div className='bg-[#f4f1ea] border-[1px] border-red-500 p-4 rounded-lg shadow-md w-[70px] mt-[20px] h-[70px] mx-auto'><FaPhone className='text-red-700 w-[40px] h-[40px] mr-2' /></div>
                <h1 className="text-[26px] font-bold mb-2 mt-4 text-center">Hot: +208-666-01112</h1>
                <h5 className="text-gray-600 text-[17px] text-center mb-[20px]">24/7/365 priority Live Chat and ticketing support.</h5>
                </div>

                <div className="bg-white border-[1px] border-red-500 p-4 rounded-lg shadow-md">
                    <div className='bg-[#f4f1ea] border-[1px] border-red-500 p-4 rounded-lg shadow-md w-[70px] mt-[20px] h-[70px] mx-auto'><IoMdTimer className='text-red-700 w-[40px] h-[40px] mr-2' /></div>
                <h1 className="text-[26px] font-bold mb-2 mt-4 text-center">Opening Hour</h1>
                <h5 className="text-gray-600 text-[17px] text-center mb-[20px]">Sunday-Fri: 9 AM – 6 PM Saturday: 9 AM – 4 PM</h5>
                </div>
           </div>
<GetinTouch></GetinTouch>
<Map></Map>

      </div>
    );
};

export default ContactUs;
