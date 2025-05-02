import DashboardHeader from "../fragments/dashboard/dashboardheader";
import { Flex } from "@chakra-ui/react";
import AiDieticianForm from "../fragments/forms/aidieticianform";

const AiDietician = () => {
  return (
    <>
      <Flex grow="1" direction="column" minH="100vh">
        <DashboardHeader></DashboardHeader>
        <AiDieticianForm></AiDieticianForm>
      </Flex>
    </>
  );
};

export default AiDietician;
