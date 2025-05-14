import {
  FaBars,
  FaHome,
  FaUser,
  FaHamburger,
  FaWeight,
  FaDownload,
} from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
const dashboardRoutes = [
  {
    icon: <FaHome></FaHome>,
    title: "Dashboard",
    path: "/login/dashboard",
  },
  {
    icon: <FaHamburger></FaHamburger>,
    title: "AI Dietician",
    path: "/login/dashboard/aidietician",
  },
  {
    icon: <FaDownload></FaDownload>,
    title: "Download Diets",
    path: "/login/dashboard/downloaddiets",
  },
  {
    icon: <FaWeight></FaWeight>,
    title: "Weight Entry",
    path: "/login/dashboard/weightentry",
  },
  {
    icon: <FaUser></FaUser>,
    title: "Account Details",
    path: "/login/dashboard/accountdetails",
  },

  {
    icon: <LuLogOut></LuLogOut>,
    title: "Log Out",
    path: "/logout",
  },
];

export default dashboardRoutes;
