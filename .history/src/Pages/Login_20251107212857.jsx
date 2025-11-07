import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import loginAnimation from '../json/Login.json'
import Lottie from 'lottie-react';

const Login = () => {
  const { handleLoginwithEmail,handleLoginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleLoginwithEmail(email, password)
      .then((result) => {
        if (result?.user) {
          toast.success('Login successful!');
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1000);
        } else {
          toast.error('Login failed: User not found!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error(`Login failed: ${error.message}`);
      });
  };

  const handelLoginwithGoogle = ()=>{
    handleLoginWithGoogle()
   .then((result) => {
      if ( result?.user?.photoURL) {
        console.log(result?.user.photoURL);
        toast.success('Login with Google successful!');
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL
        };

        axios.post("https://resturent-management-server-three.vercel.app/users", userInfo)
          .then(res => {
            console.log("User saved to DB:");
          })
          .catch(err => {
            console.error("DB Save Error:", err);
          });

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        toast.error('Google login failed!');
      }
    })
    .catch((error) => {
      console.error('Google Login Error:', error);
      toast.error(`Google login failed: ${error.message}`);
    });
  }

  return (
   <div className="container mx-auto lg:w-8/12 my-10 px-4 sm:px-6 md:px-8">
  <div className="flex flex-col lg:flex-row xl:flex-row items-center gap-6 bg-[#ebeffa] rounded-lg overflow-hidden">
    
     {/* Form */}
    <div className="w-full lg:w-1/2 xl:w-1/2 p-4 sm:p-6 md:p-10 mr-3 bg-slate-200 flex flex-col justify-center">
      <h1 className="text-2xl sm:text-xl text-[#db2525] font-bold text-center mb-6">WELCOME BACK TO FRESHEAT</h1>
      <h3 className="text-3xl sm:text-2xl font-bold text-center mb-6">LOGIN NOW!</h3>
      <form onSubmit={handelLogin} className="flex flex-col gap-4">
        <div className=" w-full">
          <div>
            <label className="label">
            <span className="label-text font-medium mb-1">Email</span>
          </label>
          </div>
          <div>
            <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input input-bordered w-9/12 bg-white border-gray-300"
            required
          />
          </div>
        </div>

        <div className=" w-full">
          <div>
          <label className="label">
            <span className="label-text font-medium mb-1">Password</span>
          </label>
          </div>
          <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="input input-bordered w-9/12 bg-white border-gray-300 "
            required
          />
          </div>
          <label className="label">
            <Link to="/forgetpassword" className="label-text-alt link link-hover mt-2">
              Forgot password?
            </Link>
          </label>
        </div>

        <button className="btn btn-primary w-full mt-2 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 ">Login</button>

        <p className=" mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500 border-b-2">
            Register
          </Link>
        </p>
      </form>

      {/* Google Login */}
      <div className="mt-6 w-full flex ">
        <button
          onClick={handelLoginwithGoogle}
          className="btn btn-outline btn-secondary flex items-center justify-center gap-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2"
        >
          <FcGoogle size={20} /> <span>Login with Google</span>
        </button>
      </div>
    </div>

    {/* Image */}
   <div className="w-full lg:w-1/2 xl:w-1/2 flex justify-center items-center p-4">
          <Lottie animationData={loginAnimation} loop={true} style={{ width: 500, height: 400 }} />
        </div>

   
  </div>
</div>

  );
};

export default Login;
