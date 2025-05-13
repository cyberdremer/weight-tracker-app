import {
  Group,
  Heading,
  HStack,
  IconButton,
  Separator,
  For,
  Button,
  List,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { FaBars, FaHome, FaUser, FaHamburger } from "react-icons/fa";
import DrawerComponent from "../drawer";
import { useContext, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import dashboardRoutes from "@/pageroutes/dashboardroutes";
import { Switch } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { InfoContext } from "@/devcreatedcomponents/context/InfoContext";
import { Link } from "react-router";
const DashboardHeader = () => {
  const [drawerVisibility, setDrawerVisbility] = useState(false);
  const {user} = useContext(InfoContext)

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
                each={dashboardRoutes}
              >
                {(item, index) => (
                  <List.Item key={index}>
                    <Link to={item.path}>
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

        <Group>
          <Avatar.Root>
            <Avatar.Fallback name={user.fullname || "AI Artist"}></Avatar.Fallback>
          </Avatar.Root>
          <ColorModeButton></ColorModeButton>

        </Group>
      </HStack>
      <Separator></Separator>
    </>
  );
};

export default DashboardHeader;
