import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<Error></Error>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
       {
        path:'/register',
        element:<Register></Register>
       },
       
       {
        path:'/contactus',
        element:<ContactUs></ContactUs>
       },
       {
        path:'/aboutus',
        element:<AboutUs></AboutUs>
       },
       {
        path:'wishlist',
        element:<WishList></WishList>
       },
       {
        path:'/menu',
        element:<Menu></Menu>
       },{
        path:'/card',
        element:<Card></Card>
       },
       {
        path:'/shippingAddr',
        element:<ShippingAddress></ShippingAddress>
       },
       {
        path:'/shippingBilling',
        element:<ShippingBilling></ShippingBilling>
       },
       {
    path: "/payment/success/:tranId",
    element: <PaymentSuccess />,
  },
       

    ]
  },
  {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
           {
        index: true, 
        element: <Navigate to="analytic" replace />
      },
      {
        path: "analytic",
        element: <Analytic></Analytic>
      },
          ,{
        path:'manageDishes',
        element:<ManageDishes></ManageDishes>
       },
       {
        path:'addDish',
        element:<AddProduct></AddProduct>
       },
       {
        path:'manageUsers',
        element:<ManageUsers></ManageUsers>
       },
        ]
  }
]);
export default router;