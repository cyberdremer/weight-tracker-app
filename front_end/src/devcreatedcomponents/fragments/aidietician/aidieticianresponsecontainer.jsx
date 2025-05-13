import { HStack, Flex, Heading, Box, VStack, Button } from "@chakra-ui/react";
import { RestaurantRounded } from "@mui/icons-material";
import AiDieticianResponse from "./aidieticianresponses";

const AiDieticianResponseContainer = ({
  response,
  handleDownload,
  handleSaveToAccount,

}) => {
  return (
    <>
      <Flex
        justifyContent="flex-end"
        width="100%"
        flexDirection="column"
        alignItems="center"
        gap="10"
      >
        <Heading>Ai Generated Diet</Heading>
        <Box overflowY="auto" maxHeight="30rem" boxShadow="md">
          <VStack>
            {response.map((entry, index) => {
              return (
                <AiDieticianResponse
                  dayNumber={index + 1}
                  breakfast={entry.breakfast}
                  lunch={entry.lunch}
                  dinner={entry.dinner}
                  exercise={entry.exercise}
                ></AiDieticianResponse>
              );
            })}
          </VStack>
        </Box>
        <HStack justifyItems="space-between">
          <Button onClick={handleSaveToAccount}>Save to account</Button>
          <Button onClick={handleDownload}>Download</Button>
        </HStack>
      </Flex>
    </>
  );
};

export default AiDieticianResponseContainer;
