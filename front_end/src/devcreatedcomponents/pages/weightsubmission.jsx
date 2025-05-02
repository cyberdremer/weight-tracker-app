import DashboardHeader from "../fragments/dashboard/dashboardheader";
import WeightForm from "../fragments/forms/weight";
import { Flex } from "@chakra-ui/react";
const WeightSubmission = () => {
  return (
    <>
      <Flex grow="1" direction="column" minHeight="100vh">
        <DashboardHeader></DashboardHeader>
        <WeightForm></WeightForm>
      </Flex>
    </>
  );
};

export default WeightSubmission;
