import React, { useContext, useEffect, useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import "../Navbar.css";
import axios from "axios";

const Navbar = () => {
  const { user, handelLogout } = useContext(AuthContext);
  const [cardItems, setCardItems] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  // 🟢 Fetch Cart
  const fetchCartItems = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(
        "https://resturent-management-server-three.vercel.app/cardItems",
        { params: { userId: user._id } }
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        setCardItems(response.data.data);
      } else {
        setCardItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCardItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  useEffect(() => {
    const handleCartUpdated = () => {
      fetchCartItems();
    };
    window.addEventListener("cart-updated", handleCartUpdated);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, [user]);

  const handelSignOut = async (e) => {
    e.preventDefault();
    try {
      await handelLogout();
      toast.success("Logout successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  return (
    <>
      {/* ============= DESKTOP NAVBAR (lg+) ============= */}
      <div className="hidden fixed top-0 lg:flex flex-col md:flex-row h-full">
        {/* Left Logo */}
        <div className="relative w-[400px] bg-white hidden md:block">
          <div className="flex items-center justify-center h-full py-6 ml-[150px]">
            <img
              src="https://i.ibb.co/BVdGNHP4/logo.png"
              alt="Logo"
              className="h-14"
            />
          </div>
        </div>

        {/* Right Area */}
        <div
          className="flex flex-col flex-grow bg-black text-white relative"
          style={{
            clipPath: "polygon(2% 0, 100% 0%, 100% 100%, 0% 100%)",
            zIndex: 5,
          }}
        >
          {/* Top Red Bar */}
          <div className="bg-red-600 text-white text-sm ml-4 px-10 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdOutlineAccessTime className="text-lg" />
              <span>09:00 am - 06:00 pm</span>
            </div>
            <div className="flex items-center gap-3 mr-[150px]">
              <span>Follow Us:</span>
              <div className="flex items-center gap-5">
                <FaFacebookF />
                <FaTwitter />
                <FaYoutube />
                <FaLinkedinIn />
              </div>
            </div>
          </div>

          {/* Bottom Black Nav */}
          <div className="px-10 py-4 flex justify-between items-center flex-wrap">
            {/* Nav Menu */}
            <div className="flex gap-6 items-center font-semibold text-sm flex-wrap">
              <NavLink to={"/"} className="hover:text-red-500">
                Home
              </NavLink>
              <NavLink to={"/wishlist"} className="hover:text-red-500">
                wishList
              </NavLink>
              <NavLink to={"/menu"} className="hover:text-red-500">
                Menus
              </NavLink>
              <NavLink to={"/aboutus"} className="hover:text-red-500">
                About Us +
              </NavLink>
              <NavLink to={"/contactus"} className="hover:text-red-500">
                Contact Us +
              </NavLink>
              <NavLink to={"/dashboard"} className="hover:text-red-500">
                dashboard
              </NavLink>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-7 mt-4 md:mt-0 text-white mr-[150px]">
              {/* Cart */}
              <button onClick={() => navigate("/card")} className="relative">
                <FaShoppingCart className="text-xl cursor-pointer" />
                <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cardItems.length}
                </span>
              </button>

              {/* Auth */}
              {user ? (
                <>
                  <div className="relative group inline-block">
                    <img
                      key={user?.image}
                      src={user?.image || "/default-avatar.png"}
                      className="w-[30px] h-[30px] rounded-full object-cover"
                      alt={user?.name || "User"}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded shadow-md z-10 whitespace-nowrap">
                      {user?.name || "User"}
                    </div>
                  </div>
                  <li onClick={handelSignOut} className="list-none">
                    <button className="bg-red-600 text-white px-4 py-2 text-sm flex items-center gap-1 hover:bg-red-700 transition">
                      LogOut <FaArrowRight />
                    </button>
                  </li>
                </>
              ) : (
                <NavLink
                  to={"/login"}
                  className="bg-red-600 text-white px-4 py-2 text-sm flex items-center gap-1 hover:bg-red-700 transition"
                >
                  Login <FaArrowRight />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============= MOBILE NAVBAR (sm, md) ============= */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/BVdGNHP4/logo.png"
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-5">
          <FaSearch className="text-gray-600 text-lg cursor-pointer" />

          {/* Cart */}
          <button onClick={() => navigate("/card")} className="relative">
            <FaShoppingCart className="text-lg cursor-pointer" />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cardItems.length}
            </span>
          </button>

          {/* Hamburger */}
          <button
            className="text-2xl text-gray-700"
            onClick={() => setMobileMenu(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Slide Animation */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
          mobileMenu ? "bg-black bg-opacity-50 visible" : "invisible"
        }`}
      >
        <div
          className={`w-72 bg-white h-full p-6 relative transform transition-transform duration-300 ${
            mobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Btn */}
          <button
            onClick={() => setMobileMenu(false)}
            className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img
              src="https://i.ibb.co/BVdGNHP4/logo.png"
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col gap-4 font-medium text-gray-800">
            <NavLink to={"/"} onClick={() => setMobileMenu(false)}>
              Home
            </NavLink>
            <NavLink to={"/aboutus"} onClick={() => setMobileMenu(false)}>
              About Us
            </NavLink>
            <NavLink to={"/menu"} onClick={() => setMobileMenu(false)}>
              Shop
            </NavLink>
            <NavLink to={"/pages"} onClick={() => setMobileMenu(false)}>
              Pages
            </NavLink>
            <NavLink to={"/blog"} onClick={() => setMobileMenu(false)}>
              Blog
            </NavLink>
            <NavLink to={"/contactus"} onClick={() => setMobileMenu(false)}>
              Contact Us
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
