import Header from "../fragments/header";
import LogInForm from "../fragments/forms/login";
import { Flex } from "@chakra-ui/react";
const LoginPage = () => {
  return (
    <Flex grow="1" direction="column" minHeight="100vh">
      <Header></Header>
      <LogInForm></LogInForm>
    </Flex>
  );
};

export default LoginPage
