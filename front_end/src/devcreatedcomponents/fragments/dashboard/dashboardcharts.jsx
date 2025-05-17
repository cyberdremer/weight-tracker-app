import { LineChart } from "@mui/x-charts";
import { Gauge } from "@mui/x-charts";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
  Container,
  Input,
  HStack,
  Button,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { protectedGetRequest } from "@/utils/requests";
import ViewEntries from "../viewentries";
import { ErrorAlert, SuccessAlert } from "@/devcreatedcomponents/alerts/alert";

const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
import timer from "@/utils/timer";
import {useFetchData} from "@/devcreatedcomponents/effects/hooks";
const DashboardCharts = ({
  entries,
  setEntries,
  form,
  setForm,
  handleSearchEntries,
  handleRefreshEntries,
  isChecked,
  handleCheckedChange,
}) => {
  const margin = { right: 24 };
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xDateLabels = entries.map((entry) => {
    return entry.date;
  });

  const weightData = entries.map((entry) => {
    return entry.weight;
  });
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];



  const [isImperial, setIsImperial] = useState(true);

  

  

  return (
    <>
      <Flex
        direction="column"
        animationName="fade-in"
        animationDuration="slowest"
        minWidth="100%"
        justifyContent="space-between"
      >
        <VStack flexGrow="1" marginTop="4">
          <HStack justifyContent="space-evenly" minW="60%">
            <Input
              type="date"
              name="startdate"
              placeholder="Start Date"
              value={form.startdate}
              onChange={(e) => {
                setForm({
                  ...form,
                  startdate: e.target.value,
                });
              }}
            ></Input>
            <Input
              type="date"
              name="enddate"
              placeholder="End Date"
              value={form.enddate}
              onChange={(e) => {
                setForm({
                  ...form,
                  enddate: e.target.value,
                });
              }}
            ></Input>
            <Button type="submit" onClick={handleSearchEntries}>
              Search for Entries
            </Button>
            <Button type="submit" onClick={handleRefreshEntries}>
              Refresh Calendar
            </Button>
            <Switch.Root
              variant={"raised"}
              checked={isImperial}
              onCheckedChange={(isImperial) => setIsImperial(!isImperial)}
            >
              <Switch.HiddenInput></Switch.HiddenInput>
              <Switch.Control></Switch.Control>

              <Switch.Label>Change weight units</Switch.Label>
            </Switch.Root>
          </HStack>
          <Heading textAlign="center">Your Weight Trends for {}</Heading>

          <Container>
            <LineChart
              height={300}
              series={[
                // {data: weightData, label: "Weight"}
                { data: pData, label: "pv" },
                { data: uData, label: "uv" },
              ]}
              // xAxis ={[{scaleType: "point", data: xDateLabels}]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              yAxis={[{ width: 50 }]}
              margin={margin}
            />
          </Container>
        </VStack>

        <VStack marginTop="4">
          <Heading>BMI for {}</Heading>
          <Gauge
            value={0 }
            startAngle={-90}
            endAngle={90}
            innerRadius="80%"
            outerRadius="100%"
          />
        </VStack>
      </Flex>
    </>
  );
};

export default DashboardCharts;
