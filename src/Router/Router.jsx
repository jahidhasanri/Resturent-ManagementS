import {
  createBrowserRouter,
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
        path:'/addDish',
        element:<AddProduct></AddProduct>
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
       }

    ]
  },
]);
export default router;