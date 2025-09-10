import { NavLink, Outlet } from "react-router";
import { FaBorderAll } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";

const DashboardLayout = () => {
  const role = "admin";
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content bg flex flex-col min-h-screen">
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
          <div className="mx-2 flex-1 px-2 font-semibold text-lg truncate">
            Dashboard
          </div>
        </div>

        {/* Page content */}
        <div className="bg w-full p-4 sm:p-6 lg:p-8 overflow-x-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side shadow-2xl">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 sm:w-72 lg:w-80 min-h-full bg-[#1d1d29] text-base-content space-y-2">
          <li className="mb-4">
            <NavLink className="mt-5 font-semibold flex justify-center" to="/">
              <img
                src="/images/ChatGPT_Image_Aug_28__2025__12_17_00_PM-removebg-preview.png"
                alt="Logo"
                className="h-12 sm:h-14 object-contain"
              />
            </NavLink>
          </li>

          {/* Admin menu */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to={"analytic"}
                  className="hover:text-red-500 cursor-pointer text-base sm:text-lg font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <FaBorderAll /> Analytic
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"manageUsers"}
                  className="hover:text-red-500 cursor-pointer text-base sm:text-lg font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageHistory /> Manage Users
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"addDish"}
                  className="hover:text-red-500 cursor-pointer text-base sm:text-lg font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageHistory /> Add Dishes
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"manageDishes"}
                  className="hover:text-red-500 cursor-pointer text-base sm:text-lg font-semibold"
                >
                  <div className="flex gap-3 items-center">
                    <MdManageHistory /> Manage Dishes
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={"font-semibold text-base sm:text-lg"}
                  to="/dashboard/all-review"
                >
                  All Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={"font-semibold text-base sm:text-lg"}
                  to={"/dashboard/add-product"}
                >
                  Add Product
                </NavLink>
              </li>
            </>
          )}

          {/* Customer menu */}
          {role === "customer" && (
            <>
              <li>
                <NavLink
                  className={"font-semibold text-base sm:text-lg"}
                  to={"/dashboard/add-product"}
                >
                  Add Product
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
