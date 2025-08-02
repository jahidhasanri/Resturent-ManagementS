import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Login = () => {
    const handelLogin = (e) =>{
          e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        }
    return (
        <div className='container my-14 bg-gray-600 rounded-md mx-auto lg:flex items-center gap-4'>
           <div className='p-[50px]'>
            <img src="https://i.ibb.co/6RQQM2m2/pizzas-around-pasta.jpg" className='lg:ml-[115px] w-[700px] h-[600px] object-cover rounded-md' alt="" />
           </div>
           <div>
             <div className="card bg-white w-full max-w-lg shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center mt-4">Login now!</h1>
            <form onSubmit={handelLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered text-white bg-slate-500"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered  text-white bg-slate-500"
                  required
                />
                <label className="label">
                  <Link to="/forgetpassword" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-red-500 border-b-2">
                  Register
                </Link>
              </p>
            </form>
            
            {/* Google Login */}
            <div className="form-control mt-4 w-8/12 mx-auto mb-10">
              <button
               
                className="btn btn-outline btn-secondary flex items-center justify-center space-x-2"
              >
                <FcGoogle /> <span>Login with Google</span>
              </button>
            </div>
          </div>
           </div>
        </div>
    );
};

export default Login;