import {
  Group,
  Link,
  Heading,
  HStack,
  IconButton,
  Separator,
  For,
  Button,
  List,
  Icon,
} from "@chakra-ui/react";
import { FaBars, FaHome, FaUser, FaHamburger } from "react-icons/fa";
import DrawerComponent from "./drawer";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";

const DashboardHeader = () => {
  const [drawerVisibility, setDrawerVisbility] = useState(false);

  const handleDrawerVisibility = (e) => {
    setDrawerVisbility(!drawerVisibility);
  };

  return (
    <>
      <HStack
        justifyContent="space-between"
        alignContent="center"
        padding="4"
        shadow="xl"
      >
        <Group gap="5">
          <DrawerComponent
            open={drawerVisibility}
            title="Menu"
            body="idk"
            close={handleDrawerVisibility}
            placement="start"
          >
            <List.Root variant="plain" align="center" gap="5">
              <For
                each={[
                  {
                    icon: <FaHome></FaHome>,
                    title: "Dashboard",
                    path: "/dashboard",
                  },
                  {
                    icon: <FaHamburger></FaHamburger>,
                    title: "AI Dietician",
                    path: "/aidietician",
                  },
                  {
                    icon: <FaUser></FaUser>,
                    title: "Account Details",
                    path: "/accountdetails",
                  },

                  {
                    icon: <LuLogOut></LuLogOut>,
                    title: "Log Out",
                    path: "/logout",
                  },
                ]}
              >
                {(item, index) => (
                  <List.Item key={index}>
                    <Link href={item.path} width="60%">
                      <List.Indicator asChild>{item.icon}</List.Indicator>
                      {item.title}
                    </Link>
                  </List.Item>
                )}
              </For>
            </List.Root>
          </DrawerComponent>
          <IconButton onClick={handleDrawerVisibility}>
            <FaBars></FaBars>
          </IconButton>
          <Heading size="5xl">Weight.Tracker</Heading>
        </Group>
      </HStack>
      <Separator></Separator>
    </>
  );
};

export default DashboardHeader;
