import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import Main from "../Components/Main";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddProduct from "../Admin/AddProduct";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";
import WishList from "../Pages/WishList";
import ManageDishes from "../Pages/ManageDishes";
import DashboardLayout from "../Pages/DashboardLayout";
import Analytic from "../Pages/Analytic";
import ManageUsers from "../Pages/ManageUsers";
import Menu from "../Pages/Menu";
import Card from "../Pages/Card";
import ShippingAddress from "../Pages/ShippingAddress";
import ShippingBilling from "../Pages/ShippingBilling";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentFail from "../Pages/PaymentFail";
import PaymentCancel from "../Pages/PaymentCancel";
import ManageOrder from "../Pages/ManageOrder";
import MyProfile from "../Pages/MyProfile";
import UserOrder from "../Pages/UserOrder";
import PrivateRoute from "./PrivateRoute";
import Review from "../Pages/Review";
import Faq from "../Pages/Faq";

const RouterComponent = () => {
  const { user } = useContext(AuthContext); // ✅ এখন সঠিক জায়গায় useContext

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/contactus", element: <ContactUs /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/faq", element: <Faq /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/menu", element: <Menu /> },
        { path: "/card", element: <Card /> },
        { path: "/shippingAddr", element: <ShippingAddress /> },
        { path: "/shippingBilling", element: <ShippingBilling /> },
        { path: "/payment/success/:tranId", element: <PaymentSuccess /> },
        { path: "/payment/fail/:tranId", element: <PaymentFail /> },
        { path: "/payment/cancel/:tranId", element: <PaymentCancel /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element:
            user?.role === "admin" ? (
              <Navigate to="analytic" replace />
            ) : (
              <Navigate to="userorder" replace />
            ),
        },
        { path: "analytic", element: <Analytic /> },
        { path: "manageDishes", element: <ManageDishes /> },
        { path: "addDish", element: <AddProduct /> },
        { path: "manageUsers", element: <ManageUsers /> },
        { path: "manageOrders", element: <ManageOrder /> },
        { path: "myProfile", element: <MyProfile /> },
        { path: "userorder", element: <UserOrder /> },
        { path: "reviews", element: <Review /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
