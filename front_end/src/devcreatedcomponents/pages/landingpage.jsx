import { Flex } from "@chakra-ui/react";
import LandingBlurb from "../fragments/landing";
import Header from "../fragments/header";
const LandingPage = () => {
  return (
    <>
      <Flex grow="1" direction="column" minHeight="100vh">
        <Header></Header>
        <LandingBlurb></LandingBlurb>
      </Flex>
    </>
  );
};


export default LandingPage;
