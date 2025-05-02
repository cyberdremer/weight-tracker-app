import { LineChart } from "@mui/x-charts";
import { Gauge } from "@mui/x-charts";
import { Flex, Grid, GridItem, Heading, VStack, Container } from "@chakra-ui/react";
const DashboardCharts = () => {
  const margin = { right: 24 };
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  return (
    <>
      <Flex
        direction="row"
        animationName="fade-in"
        animationDuration="slowest"
        minWidth="100%"
        justifyContent="space-between"
       
      >
        <VStack flexGrow="1" marginTop="4" >
            <Heading textAlign="center">Your Weight Trends</Heading>
            
            <Container>
                <LineChart
                
                  height={300}
                  series={[
                    { data: pData, label: "pv" },
                    { data: uData, label: "uv" },
                  ]}
                  xAxis={[{ scaleType: "point", data: xLabels }]}
                  yAxis={[{ width: 50 }]}
                  margin={margin}
                
                
                />
            </Container>
        </VStack>

        <VStack marginTop="4">
          <Heading>BMI</Heading>
          <Gauge
            value={0}
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
