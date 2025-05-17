import { Stack, Heading } from "@chakra-ui/react";
const EmptyContainer = ({message}) => {
  return (
    <>
      <Stack
        alignSelf="center"
        flex="1"
        animationName="pulse"
        animationDuration="slowest"
        minW="30%"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>
          {message}
        </Heading>
      </Stack>
    </>
  );
};

export default EmptyContainer