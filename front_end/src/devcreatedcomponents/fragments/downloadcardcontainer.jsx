import { Flex, Heading, Box, VStack} from "@chakra-ui/react";
import DownloadDietCard from "./downloadcard";
const DownloadDietCardContainer = ({ diets, downloadDiet, deleteDiet }) => {
  return (
    <>
      <Flex width="100%" flexDirection="column" alignItems="center" gap="10" padding="5">
        <Heading textAlign="center">Generated Diet History</Heading>
        <Box overflowY="auto" maxHeight="50rem" width="100%">
          <VStack>
            {diets.map((diet) => {
              return <DownloadDietCard
                name={diet.name}
                id={diet.id}
                downloadDiet={downloadDiet}
                deleteDiet={deleteDiet}
                key={diet.id}
              ></DownloadDietCard>;
            })}
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default DownloadDietCardContainer;
