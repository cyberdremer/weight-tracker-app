import LandingPage from "@/devcreatedcomponents/pages/landingpage";
import LoginPage from "@/devcreatedcomponents/pages/login";
import SignUpPage from "@/devcreatedcomponents/pages/signup";
import Dashboard from "@/devcreatedcomponents/pages/dashboard";
import LogOut from "@/devcreatedcomponents/pages/logout";
const pageData = [
  {
    path: "",
    element: <LandingPage></LandingPage>,
    title: "Home Page",
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
    title: "Sign Up Page",
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
    title: "Log In Page",
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    title: "Dashboard",
  },

  {
    path: "/logout",
    element: <LogOut></LogOut>,
    title: "Log Out Page"
  }
];

export default pageData;
