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
  FormatNumber,
  Text,
} from "@chakra-ui/react";
import BMIBlurb from "../aidietician/bmiblurb";
import { useContext, useState } from "react";
import { protectedGetRequest } from "@/utils/requests";
import ViewEntries from "../viewentries";
import { ErrorAlert, SuccessAlert } from "@/devcreatedcomponents/alerts/alert";
import {
  calculateBMIUsingImperial,
  calulateBMIUsingMetric,
} from "@/utils/bmicalculator";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
import { convertMetricKilosToImperialPounds } from "@/utils/unitconversions";
import timer from "@/utils/timer";
import { useFetchData } from "@/devcreatedcomponents/effects/hooks";
import { InfoContext } from "@/devcreatedcomponents/context/InfoContext";
const DashboardCharts = ({
  entries,
  form,
  setForm,
  handleSearchEntries,
  handleRefreshEntries,
  isChecked,
  handleCheckedChange,
}) => {
  const { user } = useContext(InfoContext);
  const margin = { right: 24 };
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xDateLabels = entries.map((entry) => {
    return entry.date;
  });

  const weightData = entries.map((entry) => {
    if (user.isImperial) {
      return convertMetricKilosToImperialPounds(entry.weight);
    } else {
      return entry.weight;
    }
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

  const bmi =
    user.isImperial === true
      ? calculateBMIUsingImperial(
          Number(user.height) / 2.54,
          entries[entries.length - 1].weight * 2.20462262
        )
      : calulateBMIUsingMetric(
          Number(user.height) / 100,
          entries[entries.length - 1].weight
        );

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
            {/* <Switch.Root
              variant={"raised"}
              checked={isChecked}
              onCheckedChange={(isChecked) => handleCheckedChange(!isChecked)}
            >
              <Switch.HiddenInput></Switch.HiddenInput>
              <Switch.Control></Switch.Control>

              <Switch.Label>Change weight units</Switch.Label>
            </Switch.Root> */}
          </HStack>
          <Heading textAlign="center">
            Your Weight Trends for{" "}
            {`${entries[0].date + " -  " + entries[entries.length - 1].date}`}
          </Heading>

          <Container>
            <LineChart
              height={300}
              series={[
                {
                  data: weightData,
                  label: `Weight in ${user.isImperial === true ? "lb" : "kg"}`,
                },
                // { data: pData, label: "pv" },
                // { data: uData, label: "uv" },
              ]}
              xAxis={[{ scaleType: "point", data: xDateLabels }]}
              // xAxis={[{ scaleType: "point", data: xLabels }]}
              yAxis={[{ width: 50 }]}
              margin={margin}
              grid={{ vertical: true, horizontal: true }}
            />
          </Container>
        </VStack>
        <VStack>
          <Heading size="2xl">
            Your weight for {`${entries[entries.length - 1].date}`} is
          </Heading>
          <Text textStyle="2xl">
            <FormatNumber
              value={
                user.isImperial === true
                  ? convertMetricKilosToImperialPounds(
                      entries[entries.length - 1].weight
                    )
                  : entries[entries.length - 1].weight
              }
              style="unit"
              unit={user.isImperial === true ? "pound" : "kilogram"}
            ></FormatNumber>
          </Text>
        </VStack>
        <VStack marginTop="4" gap="10">
          <Heading>BMI for {`${entries[entries.length - 1].date}`}</Heading>
          <Gauge
            value={bmi}
            valueMax={40}
            startAngle={-90}
            endAngle={90}
            innerRadius="80%"
            outerRadius="100%"
          />
          <BMIBlurb bmiValue={bmi}></BMIBlurb>
        </VStack>
        
      </Flex>
    </>
  );
};

export default DashboardCharts;
