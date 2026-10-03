import { createBrowserRouter, Navigate } from "react-router-dom";

import Protected from "./features/auth/components/Protected";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <Protected><Dashboard /></Protected>
    },{
    path: "/skill-gap",
    element: <Protected><h1 className="bg-white text-7xl">lodu complete hon 15 tak nahi soch liyo maa chod dunga</h1></Protected>
},
{
    path: "*",
    element: <Navigate to="/dashboard" />
}


]);