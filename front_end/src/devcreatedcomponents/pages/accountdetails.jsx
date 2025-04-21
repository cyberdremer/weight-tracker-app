import DashboardHeader from "../fragments/dashboardheader";
import AccountInformation from "../fragments/forms/accountinformation";
import { Flex } from "@chakra-ui/react";
const AccountDetailsPage = ({}) => {
  return (
    <Flex grow="1" direction="column" minH="100vh">
      <DashboardHeader></DashboardHeader>
      <AccountInformation></AccountInformation>
    </Flex>
  );
};


export default AccountDetailsPage