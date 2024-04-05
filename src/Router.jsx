import React from "react";
import RegisterForm from "./RegisterForm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./Error";
import Login from "./auth/Login";
import Forgotpassword from "./auth/ForgotPassword";
import Newpassword from "./auth/NewPassword";
import Profile from "./components/Profile";
import "./index.css";

const Router = () => {
  const router = createBrowserRouter([
    {
      // path: "/auth",
      // element
      errorElement: <NotFound />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgotPassword",
          element: <Forgotpassword />,
        },
        {
          path: "/resetPassword",
          element: <Newpassword />,
        },
      ],
    },

    {
      path: "/",
      //   element:
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <RegisterForm />,
          index: true,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
