import { FaBars, FaHome, FaUser, FaHamburger, FaWeight } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
const dashboardRoutes = [
  {
    icon: <FaHome></FaHome>,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <FaHamburger></FaHamburger>,
    title: "AI Dietician",
    path: "/aidietician",
  },
  {
    icon: <FaWeight></FaWeight>,
    title: "Weight Entry",
    path: "/weightentry",
  },
  {
    icon: <FaUser></FaUser>,
    title: "Account Details",
    path: "/accountdetails",
  },

  {
    icon: <LuLogOut></LuLogOut>,
    title: "Log Out",
    path: "/logout",
  },
];

export default dashboardRoutes;
