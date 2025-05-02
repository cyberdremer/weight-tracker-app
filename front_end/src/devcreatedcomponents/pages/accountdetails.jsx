import { use, useState } from "react";
import DashboardHeader from "../fragments/dashboard/dashboardheader";
import { DeleteAccountAlert } from "../alerts/alert";
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

export default AccountDetailsPage;
