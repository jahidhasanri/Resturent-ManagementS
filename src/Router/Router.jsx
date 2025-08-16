import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Components/Main";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddProduct from "../Admin/AddProduct";

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
       }

    ]
  },
]);
export default router;