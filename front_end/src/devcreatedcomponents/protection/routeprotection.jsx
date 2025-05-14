import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
const RequireAuth = ({ children }) => {
  const { authed } = useContext(AuthContext);
  const navigate = useNavigate();
  return authed ? children : <Navigate to="/login"></Navigate>;
};

export default RequireAuth;
