import { VStack, Box, Flex, Heading } from "@chakra-ui/react";
import WeightEntryCard from "./weightentrycard";
import { convertMetricKilosToImperialPounds } from "@/utils/unitconversions";
const ViewEntries = ({ entries, isImperial }) => {
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Flex width="100%" flexDirection="column" alignItems="center" marginTop="4">
        <Heading textAlign="center">Weight Entries</Heading>
        <Box overflowY="auto" maxHeight="30rem"  width="100%" >
          <VStack width="100%" gap="4" marginTop="4">
            {sortedEntries.map((entry) => {
              return (
                <WeightEntryCard
                  notes={entry.notes}
                  weight={isImperial === true ? convertMetricKilosToImperialPounds(entry.weight) : entry.weight}
                  date={entry.date}
                  key={entry.id}
                  isImperial={isImperial}
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
