import { NavLink, Outlet } from "react-router";
import { FaBorderAll } from "react-icons/fa";
import { MdManageHistory, MdManageAccounts } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content bg flex flex-col">
        {/* Navbar for small devices */}
        <div className="navbar bg-[#f5f2eb] lg:hidden w-full">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

        {/* Outlet */}
        <div className="bg">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side shadow-2xl">

        {/* ❗X Close Button (Mobile/Tablet Only) */}
        <div className="lg:hidden absolute right-4 top-4 z-50">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-sm btn-circle bg-red-500 text-white"
          >
            ✕
          </label>
        </div>

        {/* Drawer overlay */}
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 min-h-full bg-[#1d1d29] text-base-content">

          {/* Logo */}
          <li>
            <NavLink className="mt-5 font-semibold" to="/">
              <img
                src="/images/ChatGPT_Image_Aug_28__2025__12_17_00_PM-removebg-preview.png"
                alt="Logo"
                className="h-14"
              />
            </NavLink>
          </li>

          {/* Admin Menu */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to={"analytic"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <FaBorderAll /> Analytic
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"manageUsers"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageHistory /> ManageUsers
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"addDish"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageHistory /> AddDishes
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"manageDishes"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <BiDish /> ManageDishes
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"manageOrders"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <AiOutlineBorderlessTable /> ManageOrder
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"myProfile"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageAccounts /> My Profile
                  </div>
                </NavLink>
              </li>
            </>
          )}

          {/* Employee Menu */}
          {role === "employee" && (
            <>
              <li>
                <NavLink
                  to={"manageOrders"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <AiOutlineBorderlessTable /> ManageOrder
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"myProfile"}
                  className="hover:text-red-500 cursor-pointer text-[20px] font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageAccounts /> My Profile
                  </div>
                </NavLink>
              </li>
            </>
          )}

          {/* User Menu */}
          {role === "user" && (
            <>
              <li>
                <NavLink
                  to={"usercurrentOrder"}
                  className="hover:text-red-500 cursor-pointer text-[20px] text-white font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageAccounts /> My Current Order
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"userorder"}
                  className="hover:text-red-500 cursor-pointer text-[20px] text-white font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageAccounts /> My All Order
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"reviews"}
                  className="hover:text-red-500 cursor-pointer text-[20px] text-white font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageAccounts /> Review Items
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"myProfile"}
                  className="hover:text-red-500 cursor-pointer text-[20px] text-white font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageAccounts /> My Profile
                  </div>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
