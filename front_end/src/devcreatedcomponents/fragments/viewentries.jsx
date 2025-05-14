
import { VStack, Box, Flex, Heading } from "@chakra-ui/react";
import WeightEntryCard from "./weightentrycard";
const ViewEntries = ({ entries }) => {
  return (
    <>
      <Flex width="100%" flexDirection="column" alignItems="center">
        <Heading textAlign="center">Weight Entries</Heading>
        <Box overflowY="auto" maxHeight="30rem" boxShadow="md" width="100%">
          <VStack width="100%" gap="4">
            {entries.map((entry) => {
              return (
                <WeightEntryCard
                  notes={entry.notes}
                  weight={entry.weight}
                  date={entry.date}
                  key={entry.id}
                ></WeightEntryCard>
              );
            })}
          </VStack>
        </Box>
      </Flex>
    </>
  );
};


export default ViewEntries;