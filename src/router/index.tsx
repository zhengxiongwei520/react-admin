import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Home = lazy(() => import("@/views/Home"));
const About = lazy(() => import("@/views/About"));
const Login = lazy(() => import("@/views/Login"));
const Start = lazy(() => import("@/views/Start"));
const constantRoutes = [
  {
    path: "/",
    element: <Navigate to="/system/userCenter" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/start",
    element: <Start />,
  },
];
export default constantRoutes;
