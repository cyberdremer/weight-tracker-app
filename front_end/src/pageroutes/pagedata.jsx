import LandingPage from "@/devcreatedcomponents/pages/landingpage";
import LoginPage from "@/devcreatedcomponents/pages/login";
import SignUpPage from "@/devcreatedcomponents/pages/signup";
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
];

export default pageData;
