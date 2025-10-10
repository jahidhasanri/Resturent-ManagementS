import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const { handleLoginwithEmail, handleLoginWithGoogle } = useContext(AuthContext);
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

  const handelLoginwithGoogle = () => {
    handleLoginWithGoogle()
      .then((result) => {
        if (result?.user?.photoURL) {
          toast.success('Login with Google successful!');
          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email,
            image: result?.user?.photoURL,
          };

          axios.post("http://localhost:5000/users", userInfo)
            .then(res => console.log("User saved to DB"))
            .catch(err => console.error("DB Save Error:", err));

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
  };

  return (
    <div className="container mx-auto my-10 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row items-center gap-8 bg-gray-600 rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.ibb.co/6RQQM2m2/pizzas-around-pasta.jpg"
            className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover"
            alt="Food"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-white flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Login now!</h1>

          <form onSubmit={handelLogin} className="flex flex-col gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <Link to="/forgetpassword" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>

            <button className="btn btn-primary w-full mt-2">Login</button>

            <p className="text-center mt-4 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-red-500 border-b-2">
                Register
              </Link>
            </p>
          </form>

          {/* Google Login */}
          <div className="mt-6 w-full flex justify-center">
            <button
              onClick={handelLoginwithGoogle}
              className="btn btn-outline btn-secondary flex items-center justify-center gap-2 w-full sm:w-3/4"
            >
              <FcGoogle size={20} /> <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
