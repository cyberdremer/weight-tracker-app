import { ProgressCircle, Stack } from "@chakra-ui/react";

const LoadingPlaceholder = () => {
  return (
    <>
      <Stack
        alignSelf="center"
        flex="1"
        animationName="pulse"
        animationDuration="slowest"
        minW="100%"
        alignItems="center"
        justifyContent="center"
      >
        <ProgressCircle.Root value={null} size="xl">
          <ProgressCircle.Circle>
            <ProgressCircle.Track></ProgressCircle.Track>
            <ProgressCircle.Range></ProgressCircle.Range>
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </Stack>
    </>
  );
};

export default LoadingPlaceholder
