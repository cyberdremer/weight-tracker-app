import LandingPage from "@/devcreatedcomponents/pages/landingpage";
import LoginPage from "@/devcreatedcomponents/pages/login";
import SignUpPage from "@/devcreatedcomponents/pages/signup";
import Dashboard from "@/devcreatedcomponents/pages/dashboard";
const pageData = [
  {
    path: "",
    element: <LandingPage></LandingPage>,
    title: "Landing Page",
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
    title: "Sign Up Page",
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
    title: "Log In",
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    title: "Dashboard",
  },
];

export default pageData;
