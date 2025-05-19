import { useContext, useEffect } from "react";
import Header from "../fragments/header";
import LogOutBlurb from "../fragments/logoutblurb";
import { Flex } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
const LogOut = () => {
  const { destroySession } = useContext(AuthContext);
  useEffect(() => {
    const logOutAndRedirect = async () => {
      await destroySession();
    };
    logOutAndRedirect();
  }, []);
  return (
    <Flex grow="1" direction="column" minHeight="100vh">
      <Header></Header>
      <LogOutBlurb></LogOutBlurb>
    </Flex>
  );
};

export default LogOut;
