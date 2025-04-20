import { Flex, Text, Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const LogOutBlurb = () => {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      animationName="fade-in"
      animationDuration="slowest"
      minHeight="100vh"
    >
      <VStack alignItems="center" alignSelf="center" flex="1" justifyContent="center" gap="10">
          <Heading>You have succesfully logged out!</Heading>
          <Button onClick={() => navigate("/")}>Return to home</Button>
      </VStack>
    </Flex>
  );
};


export default LogOutBlurb;
