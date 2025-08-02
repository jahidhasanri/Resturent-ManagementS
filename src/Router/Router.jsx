import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Components/Main";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
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

        }
    ]
  },
]);
export default router;