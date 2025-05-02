import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import DashboardHeader from "../fragments/dashboard/dashboardheader";

import DashboardCharts from "../fragments/dashboard/dashboardcharts";
const Dashboard = () => {

  return (
    <>
      <Flex grow="1" direction="column" minH="100vh">
        <DashboardHeader></DashboardHeader>
        <DashboardCharts></DashboardCharts>
      </Flex>
    </>
  );
};

export default Dashboard;
