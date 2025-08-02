import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth'; // ✅ Needed for name & photo

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
      await axios.post('http://localhost:5000/users', {
        name,
        email,
        image: imageUrl,
        role: 'user'
      });

      // 5. Set user context
      SetUser({
        email:email,
        displayName: name,
        photoURL: imageUrl
      });

      toast.success("Registration successful!");
      form.reset();
      setPreview(null);
      navigate('/');

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
    <div className="bg-gray-200 min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-[1200px] h-auto md:h-[700px] grid grid-cols-1 md:grid-cols-2 items-center bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden shadow-xl"
        style={{
          backgroundImage: `url('https://i.ibb.co/NgxVKZm5/register-Page-Banner.jpg')`
        }}
      >
        <div></div>
        <div className="h-full rounded-xl flex items-center justify-center bg-white p-6 md:p-10">
          <form onSubmit={handleRegister} className="w-full max-w-md space-y-5">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Register</h2>

            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border rounded-md bg-gray-100" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" name="email" required className="w-full px-4 py-2 border rounded-md bg-gray-100" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Profile Image</label>
              <input type="file" name="image" accept="image/*" required onChange={handleImageChange} className="w-full" />
              {preview && (
                <img src={preview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-full border" />
              )}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2 border rounded-md bg-gray-100 pr-10"
              />
              <span className="absolute top-10 right-3 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <p className="text-red-600 text-sm -mt-3 mb-10">{error}</p>}

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
