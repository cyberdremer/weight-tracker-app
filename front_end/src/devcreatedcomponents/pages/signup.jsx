import Header from "../fragments/header";
import SignUpForm from "../fragments/forms/signup";
import { Flex } from "@chakra-ui/react";
const SignUpPage = () => {
  return (
    <Flex grow="1" direction="column" minHeight="100vh">
      <Header></Header>
      <SignUpForm></SignUpForm>
    </Flex>
  );
};

export default SignUpPage;
