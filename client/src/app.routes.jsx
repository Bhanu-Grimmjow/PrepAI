import { createBrowserRouter, Navigate } from "react-router-dom";
import Protected        from "./features/auth/components/Protected";
import Dashboard        from "./features/dashboard/pages/Dashboard";
import Login            from "./features/auth/pages/Login";
import Register         from "./features/auth/pages/Register";
import StartInterview   from "./features/session/pages/StartInterview";
import InterviewSession from "./features/session/pages/InterviewSession";

export const router = createBrowserRouter([
    { path: "/",               element: <Navigate to="/dashboard" /> },
    { path: "/login",          element: <Login /> },
    { path: "/register",       element: <Register /> },
    { path: "/dashboard",      element: <Protected><Dashboard /></Protected> },
    { path: "/mock-interview", element: <Protected><StartInterview /></Protected> },
    { path: "/interview/:id",  element: <Protected><InterviewSession /></Protected> },
    { path: "*",               element: <Navigate to="/dashboard" /> },
]);
