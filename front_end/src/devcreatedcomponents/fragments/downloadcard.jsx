import { IconButton, Icon, HStack, Heading, Group } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
const DownloadDietCard = ({ name, downloadDiet, deleteDiet, id, }) => {
  return (
    <>
      <HStack
        gap="10"
        key={id}
        borderRadius="md"
        borderWidth="1px"
        boxShadow="md"
        maxWidth="900px"
        padding="4"
        width="100%"
        animationName="slide-from-left-full"
        animationDuration="slowest"
        
      >
        <Heading flex="1">{name}</Heading>
        <Group justifyItems="flex-end" gap="3">
          <IconButton id={id} onClick={() => downloadDiet(id)} >
            <FaDownload></FaDownload>
          </IconButton>
          <IconButton id={id} onClick={() => deleteDiet(id)}>
            <FaDeleteLeft></FaDeleteLeft>
          </IconButton>
        </Group>
      </HStack>
    </>
  );
};

export default DownloadDietCard;
