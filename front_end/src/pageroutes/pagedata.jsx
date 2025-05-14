import LandingPage from "@/devcreatedcomponents/pages/landingpage";
import LoginPage from "@/devcreatedcomponents/pages/login";
import SignUpPage from "@/devcreatedcomponents/pages/signup";
import Dashboard from "@/devcreatedcomponents/pages/dashboard";
import LogOut from "@/devcreatedcomponents/pages/logout";
import WeightSubmission from "@/devcreatedcomponents/pages/weightsubmission";
import AccountDetailsPage from "@/devcreatedcomponents/pages/accountdetails";
import AiDietician from "@/devcreatedcomponents/pages/aidietician";
import DownloadDiets from "@/devcreatedcomponents/pages/downloaddiets";
import RequireAuth from "@/devcreatedcomponents/protection/routeprotection";
import { InfoProvider } from "@/devcreatedcomponents/context/InfoContext";
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
    path: "/login/dashboard",
    element: (
      <RequireAuth>
        <Dashboard></Dashboard>
      </RequireAuth>
    ),
    title: "Dashboard",
  },
  {
    title: "Account Details",
    element: (
      <RequireAuth>
        <AccountDetailsPage></AccountDetailsPage>
      </RequireAuth>
    ),
    path: "/login/dashboard/accountdetails",
  },
  {
    title: "Ai Dietician",
    element: (
      <RequireAuth>
        <AiDietician></AiDietician>
      </RequireAuth>
    ),
    path: "/login/dashboard/aidietician",
  },

  {
    path: "/logout",
    element: <LogOut></LogOut>,
    title: "Log Out Page",
  },
  {
    path: "/login/dashboard/weightentry",
    element: (
      <RequireAuth>
        <WeightSubmission></WeightSubmission>
      </RequireAuth>
    ),
    title: "Weight Submisson",
  },
  {
    path: "/login/dashboard/downloaddiets",
    element: (
      <RequireAuth>
        <DownloadDiets></DownloadDiets>
      </RequireAuth>
    ),
    title: "Download Diets",
  },
];

export default pageData;
