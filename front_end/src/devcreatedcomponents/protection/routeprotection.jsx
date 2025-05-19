import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import LoadingPlaceholder from "../fragments/loading";
import { Navigate } from "react-router";
const RequireAuth = ({ children }) => {
  const { authed, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  if (loading) {
    return (
      <>
        <Flex grow="1" direction="column" minH="100vh">
          <LoadingPlaceholder></LoadingPlaceholder>
        </Flex>
      </>
    );
  }
  if (error) {
    <Navigate to="/login"></Navigate>;
  }
  return authed ? children : <Navigate to="/login"></Navigate>;
};

export default RequireAuth;
