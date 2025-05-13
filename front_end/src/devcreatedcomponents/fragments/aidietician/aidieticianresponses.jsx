import {
  Flex,
  Heading,
  VStack,
  HStack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";

const AiDieticianResponse = ({
  dayNumber,
  breakfast,
  lunch,
  dinner,
  exercise,
}) => {
  return (
    <VStack
    alignSelf="flex-end"
      alignItems="flex-start" // Align content to the start of each container
      justifyContent="flex-end" // Center content vertically
      width="100%" // Ensure consistent width
      maxWidth="600px" // Optional: Set a max width for better layout
      padding="4" // Add padding for spacing
      borderWidth="1px" // Add a border for visual separation
      borderRadius="md" // Add rounded corners
      boxShadow="md" // Add a shadow for better visibility
    >
      <Heading size="md">Day: {dayNumber}</Heading>
      <StackSeparator />
      <HStack alignSelf="flex-start">
        <Heading size="sm">Breakfast: </Heading>
        <Text>{breakfast}</Text>
      </HStack>
      <StackSeparator />
      <HStack alignSelf="flex-start">
        <Heading size="sm">Lunch: </Heading>
        <Text>{lunch}</Text>
      </HStack>
      <StackSeparator />
      <HStack alignSelf="flex-start">
        <Heading size="sm">Dinner: </Heading>
        <Text>{dinner}</Text>
      </HStack>
      <StackSeparator />
      <HStack alignSelf="flex-start">
        <Heading size="sm">Exercise: </Heading>
        <Text>{exercise}</Text>
      </HStack>
    </VStack>
  );
};

export default AiDieticianResponse;
