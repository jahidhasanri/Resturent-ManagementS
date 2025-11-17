import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import loginAnimation from '../json/success.json';
import Lottie from 'lottie-react';


const Register = () => {
 const [preview, setPreview] = useState(null);
 const [showPassword, setShowPassword] = useState(false);
 const [error, setError] = useState("");
 const { handelWithRegister, SetUser } = useContext(AuthContext);
 const navigate = useNavigate();


 const handleRegister = async (e) => {
   e.preventDefault();
   const form = e.target;
   const name = form.name.value;
   const email = form.email.value;
   const password = form.password.value;
   const image = form.image.files[0];


   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
   if (!passwordRegex.test(password)) {
     setError("Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character.");
     return;
   }


   setError("");


   try {
     // 1. Create user
     const result = await handelWithRegister(email, password);


     // 2. Upload image to imgbb
     const formData = new FormData();
     formData.append("image", image);


     const imgRes = await axios.post(
       `https://api.imgbb.com/1/upload?key=8be0cdd4b85b2bb02d8b738407647b48`,
       formData
     );


     const imageUrl = imgRes.data.data.url;


     // 3. Update Firebase profile
     await updateProfile(result.user, {
       displayName: name,
       photoURL: imageUrl
     });


     // 4. Save to your backend
     await axios.post('https://resturent-management-server-three.vercel.app/users', {
       name,
       email,
       image: imageUrl,
       role: 'user'
     });


     // 5. Set user context
     SetUser({
       email: email,
       displayName: name,
       photoURL: imageUrl
     });


     toast.success("Registration successful!");
     form.reset();
     setPreview(null);
     setTimeout(() => navigate('/'), 1000);
   } catch (err) {
     console.error(err);
     toast.error("Registration failed. Please try again.");
   }
 };


 const handleImageChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     setPreview(URL.createObjectURL(file));
   }
 };


 return (
   <div className="bg-gray-200 py-10 md:py-20 flex items-center justify-center px-4">
     <div className="w-full max-w-[1200px] h-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 items-center bg-cover bg-center rounded-lg overflow-hidden shadow-xl">
      
       {/* Form Section */}
       <div className="h-full rounded-xl flex items-center justify-center bg-[#dfcac3] p-6 md:p-10">
         <form onSubmit={handleRegister} className="w-full max-w-md space-y-5">
           <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Register</h2>


           {/* Name Field */}
           <div>
             <label htmlFor="name" className="block mb-1 font-medium">Name</label>
             <input
               type="text"
               name="name"
               id="name"
               required
               className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             />
           </div>


           {/* Email Field */}
           <div>
             <label htmlFor="email" className="block mb-1 font-medium">Email</label>
             <input
               type="email"
               name="email"
               id="email"
               required
               className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             />
           </div>


           {/* Image Upload */}
           <div>
             <label htmlFor="image" className="block mb-1 font-medium">Profile Image</label>
             <input
               type="file"
               name="image"
               id="image"
               accept="image/*"
               required
               onChange={handleImageChange}
               className="w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
             />
             {preview && (
               <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full border" />
             )}
           </div>


           {/* Password Field */}
           <div className="relative">
             <label htmlFor="password" className="block mb-1 font-medium">Password</label>
             <input
               type={showPassword ? "text" : "password"}
               name="password"
               id="password"
               required
               className="w-full px-4 py-2 border rounded-md bg-gray-100 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             />
             <span
               className="absolute top-10 right-3 cursor-pointer text-gray-600"
               onClick={() => setShowPassword(!showPassword)}
             >
               {showPassword ? <FaEyeSlash /> : <FaEye />}
             </span>
           </div>


           {/* Error Message */}
           {error && <p className="text-red-600 text-sm">{error}</p>}


           {/* Submit Button */}
           <button
             type="submit"
             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
           >
             Register
           </button>
         </form>
       </div>


       {/* Animation Section */}
       <div className="w-full flex justify-center items-center p-4 md:p-0">
         <Lottie animationData={loginAnimation} loop={true} style={{ width: "100%", height: "100%", maxWidth: 400, maxHeight: 400 }} />
       </div>


     </div>
   </div>
 );
};


export default Register;