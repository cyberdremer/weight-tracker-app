import { Heading, VStack, Text, FormatNumber } from "@chakra-ui/react";
const WeightEntryCard = ({ notes, weight, date, id, isImperial }) => {
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
        <Text>
          <FormatNumber
            value={weight}
            style="unit"
            unit={isImperial ? "pound" : "kilogram"}
          ></FormatNumber>
        </Text>
        <Text>Notes: {notes}</Text>
      </VStack>
    </>
  );
};

export default WeightEntryCard;
