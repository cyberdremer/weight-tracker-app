import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import DashboardHeader from "../fragments/dashboardheader";
import Drawer from "../fragments/drawer";
import Menu from "../fragments/menu";
import DrawerComponent from "../fragments/drawer";
const Dashboard = () => {
  

  return (
    <>
      <Flex grow="1" direction="column" minH="100vh">
        <DashboardHeader
        ></DashboardHeader>
        
      </Flex>
    </>
  );
};

export default Dashboard;
