import LandingPage from "@/devcreatedcomponents/pages/landingpage";
import LoginPage from "@/devcreatedcomponents/pages/login";
import SignUpPage from "@/devcreatedcomponents/pages/signup";
import Dashboard from "@/devcreatedcomponents/pages/dashboard";
import LogOut from "@/devcreatedcomponents/pages/logout";
import WeightSubmission from "@/devcreatedcomponents/pages/weightsubmission";
import AccountDetailsPage from "@/devcreatedcomponents/pages/accountdetails";
import AiDietician from "@/devcreatedcomponents/pages/aidietician";
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
    title: "Account Details",
    element: <AccountDetailsPage></AccountDetailsPage>,
    path: "/accountdetails",
  },
  {
    title: "Ai Dietician",
    element: <AiDietician></AiDietician>,
    path: "/aidietician",
  },

  {
    path: "/logout",
    element: <LogOut></LogOut>,
    title: "Log Out Page",
  },
  {
    path: "/weightentry",
    element: <WeightSubmission></WeightSubmission>,
    title: "Weight Submisson",
  },
];

export default pageData;
