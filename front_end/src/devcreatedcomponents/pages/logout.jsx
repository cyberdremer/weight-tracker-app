import Header from "../fragments/header";
import LogOutBlurb from "../fragments/logoutblurb";
import { Flex } from "@chakra-ui/react";
const LogOut = () => {
  return (
    <Flex grow="1" direction="column" minHeight="100vh">
      <Header></Header>
      <LogOutBlurb></LogOutBlurb>
    </Flex>
  );
};

export default LogOut;
