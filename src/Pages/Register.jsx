import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [preview, setPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = (e) => {
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
        console.log({ name, email, password, image });
        setPreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center px-4">
            <div
                className="w-full max-w-[1200px] h-auto md:h-[600px] grid grid-cols-1 md:grid-cols-2 items-center bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden shadow-xl relative"
                style={{
                    backgroundImage: `url('https://i.ibb.co/NgxVKZm5/register-Page-Banner.jpg')`
                }}
            >
                <div></div>
                {/* Form (Right Side on large, bottom on small) */}
                <div className=" mt-2px mr-2px mb-2px h-[550px] rounded-xl lg:w-[500px] flex items-center justify-center ri bg-white p-6 md:p-10">
                    <form
                        onSubmit={handleRegister}
                        className="w-full max-w-md space-y-5"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Register</h2>

                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block mb-1 font-medium">Profile Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                                required
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-2 w-20 h-20 object-cover rounded-full border"
                                />
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                className="w-full px-4 py-2 border rounded-md bg-gray-100 pr-10 focus:outline-none focus:ring"
                            />
                            <span
                                className="absolute top-10 right-3 cursor-pointer text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Error */}
                        {error && <p className="text-red-600 text-sm -mt-3">{error}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
