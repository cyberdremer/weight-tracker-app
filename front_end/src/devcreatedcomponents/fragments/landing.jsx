import {
  Button,
  Flex,
  Heading,
  Container,
  Group,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import InfoCards from "./infocards";

const LandingBlurb = () => {

  const navigate = useNavigate();

  return (
    <>
      <Flex direction="column" gap="20" flexGrow="3" marginTop="4" animationName="fade-in" animationDuration="slowest">
        <VStack alignItems="center" alignSelf="center" gap="10" flex="1">
          <Heading size="2xl">Your Personal Weight Tracking Assistant</Heading>
          <Heading size="5xl" textAlign="center">
            Track your weight with <br></br> precision using Weight.Tracker!
          </Heading>
          <Text textAlign="center">
            Get meal recommendations, track your weight effortlessly,<br></br>{" "}
            and achieve your desired body using your personalized insights!
          </Text>
          <Group>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
            <Button onClick={() => navigate("/login")}>Log In</Button>
          </Group>
        </VStack>

        <HStack gap="10" alignSelf="center" marginBottom="10">
          <InfoCards
            description={
              "Log your daily weight. Track it to see how fast you are reaching your goals!"
            }
            title={"Weight Tracking"}
          ></InfoCards>
          <InfoCards
            description="Get a personalized diet that will help you reach your weight goal!"
            title="Meal Recommendations"
          ></InfoCards>
          <InfoCards
            title="Visual Analytics"
            description="Track your progress with beautiful, interactive charts and insights!"
          ></InfoCards>
        </HStack>
      </Flex>
    </>
  );
};

export default LandingBlurb;
