import {
  createBrowserRouter,
} from "react-router-dom";

import App from '../App'
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Books/CartPage";
import CheckoutPage from "../pages/Books/CheckoutPage";
import SingleBook from "../pages/Books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/Books/OrderPage";
// import DashBoard from "../pages/dashboard/DashBoard";
import AdminRoutes from "./AdminRoutes";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashBoard from "../pages/dashboard/DashBoard";
import ManageBooks from "../pages/dashboard/manageBooks/manageBooks";
import AddBook from "../pages/dashboard/addBooks/AddBook";
import UpdateBook from "../pages/dashboard/EditBooks/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:'/',
          element:<Home/>,
        },
        {
          path:'/orders',
          element:<PrivateRoute><OrderPage/></PrivateRoute> // Assuming you have an OrderPage component to display orders
        },
        {
          path:'/about',
          element:<div>about</div>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },{
          path:"/cart",
          element:<CartPage/>
        },{
          path:'/checkout',
          element:<PrivateRoute><CheckoutPage/></PrivateRoute>
        },{
          path:'/books/:id',
          element:<SingleBook/> // Assuming you have a SingleBook component to display book details
        },
         {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        },
      ]
    },
    {
      path:'/admin',
      element:<AdminLogin/>, // Placeholder for admin login, replace with actual component
    },
    {
          path:'/dashboard',
          element:<AdminRoutes><DashboardLayout/></AdminRoutes>, // Placeholder for dashboard, replace with actual component
          children:[
            {
            path:'',
            element:<AdminRoutes><DashBoard/></AdminRoutes>// Placeholder for admin dashboard, replace with actual component
            },
            {
              path:'add-new-book',
              element:<AdminRoutes><AddBook/></AdminRoutes> // Placeholder for add new book, replace with actual component
            },
            {
              path:'edit-book/:id',
              element:<AdminRoutes><UpdateBook/></AdminRoutes> // Placeholder for edit books, replace with actual component
            },
            {
              path:'manage-books',
              element:<AdminRoutes><ManageBooks/></AdminRoutes> // Placeholder for manage book, replace with actual component
            }
          ]

    },
      
  ]);
  

export default router;