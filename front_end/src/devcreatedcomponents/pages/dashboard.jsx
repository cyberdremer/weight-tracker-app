import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import DashboardHeader from "../fragments/dashboardheader";

import DashboardCharts from "../fragments/dashboardcharts";
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
