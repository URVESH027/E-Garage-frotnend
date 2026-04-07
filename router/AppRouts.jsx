import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AdminSidebar from "../pages/Admin";
import { Forgotpassword } from "../components/home/ForgotPassword";
import { ResetPassword } from "../components/home/ResetPassword";
import PaymentSuccess from "../Pages/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: <AdminSidebar />
  },
  {
    path: "/forgot-password",
    element: <Forgotpassword />
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
