import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import AddActivity from "./assets/Component/AddActivity/AddActivity";
import Dashboard from "./assets/Component/Dashboard/Dashboard";
import Home from "./assets/Component/Home/Home";
import Login from "./assets/Component/Login/Login";
import Register from "./assets/Component/Register/Register";
import Walking from './assets/Component/Activity/Walking';
import EditActivity from './assets/Component/EditActivity/EditActivity'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addActivity",
    element: <AddActivity />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/activity",
    element: <Walking />,
  },
  {
    path: "/editactivity/:actvityId",
    element: <EditActivity />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
