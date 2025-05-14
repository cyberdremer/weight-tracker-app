import { Heading, VStack, Text } from "@chakra-ui/react";
const WeightEntryCard = ({ notes, weight, date, id }) => {
  return (
    <>
      <VStack
        gap="4"
        key={id}
        borderRadius="md"
        borderWidth="1px"
        boxShadow="md"
        maxWidth="70%"
        padding="4"
        width="100%"
        animationName="slide-from-left-full"
        animationDuration="slowest"
        
      >
        <Heading textAlign="center">Date: {date}</Heading>
        <Text >Weight: {weight}</Text>
        <Text>Notes: {notes}</Text>
      </VStack>
    </>
  );
};

export default WeightEntryCard;
