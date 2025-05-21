import { useContext, useState } from "react";
import { Flex, Stack, ProgressCircle, Em } from "@chakra-ui/react";
import ViewEntries from "../fragments/viewentries";
import DashboardHeader from "../fragments/dashboard/dashboardheader";
import { useFetchData } from "../effects/hooks";
import DashboardCharts from "../fragments/dashboard/dashboardcharts";
import { protectedGetRequest } from "@/utils/requests";
import {
  calculateBMIUsingImperial,
  calulateBMIUsingMetric,
} from "@/utils/bmicalculator";
import { InfoContext } from "../context/InfoContext";
import LoadingPlaceholder from "../fragments/loading";
import { ErrorAlert, SuccessAlert } from "../alerts/alert";
import EmptyContainer from "../fragments/emptycontainer";
import timer from "@/utils/timer";


//   {
//     id: 1,
//     weight: 70,
//     date: "2023-10-01",
//     notes: "Feeling good",
//   },
//   {
//     id: 2,
//     weight: 72,
//     date: "2023-10-02",
//     notes: "A bit tired",
//   },
//   {
//     id: 3,
//     weight: 71,
//     date: "2023-10-03",
//     notes: "Had a good workout",
//   },
//   {
//     id: 4,
//     weight: 69,
//     date: "2023-10-04",
//     notes: "Feeling great",
//   },
//   {
//     id: 5,
//     weight: 68,
//     date: "2023-10-05",
//     notes: "Need to eat more protein",
//   },
// ];

const Dashboard = () => {


  const { entries, error, loading } = useFetchData("/weight/retrieve");
  const { user } = useContext(InfoContext);

  const setEntries = () => {};

  const [isImperial, setIsImperial] = useState(true);

  const [form, setForm] = useState({
    startdate: "",
    enddate: "",
  });

  const [responseError, setResponseError] = useState({
    error: false,
    message: "",
  });

  const [responseSuccess, setResponseSuccess] = useState({
    success: false,
    message: "",
  });

  const handleSearchEntries = async (e) => {
    e.preventDefault();
    try {
      if(form.startdate === "" || form.enddate === ""){
        throw new Error("Search criteria cannot be empty!")
      }
      const searchStartDate = new Date(form.startdate)
        .toLocaleDateString()
        .replaceAll("/", "-");
      const searchEndDate = new Date(form.enddate)
        .toLocaleDateString()
        .replaceAll("/", "-");
      const response = await protectedGetRequest(
        `/weight/retrieve/${searchStartDate + "-" + searchEndDate}`
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      setResponseSuccess({
        success: true,
        message: response.data.message,
      });

      const searchEntries = response.data.entries.map((entry) => ({
        date: new Date(entry.createdat).toLocaleDateString(),
        id: entry.id,
        note: entry.notes,
        weight: entry.weight,
      }));

      setEntries(searchEntries);

      setTimeout(() => {
        setResponseSuccess({
          success: false,
          message: "",
        });
      }, timer);
    } catch (error) {
      setResponseError({
        error: true,
        message: error.message,
      });

      setTimeout(() => {
        setResponseError({
          error: false,
          message: "",
        });
      }, timer);
    }
  };

  const handleRefreshEntries = async (e) => {
    e.preventDefault();
    try {
      const response = await protectedGetRequest(`/weight/retrieve`);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setResponseSuccess({
        success: true,
        message: response.data.message,
      });
      setEntries(
        response.data.entries.map(({ createdat, weight, notes, id }) => ({
          id: id,
          notes: notes,
          weight: weight,
          date: new Date(createdat).toLocaleDateString(),
        }))
      );
      setTimeout(() => {
        setResponseSuccess({
          success: false,
          message: "",
        });
      }, timer);
    } catch (error) {
      setResponseError({
        error: true,
        message: error.message,
      });
      setTimeout(() => {
        setResponseError({
          error: false,
          message: "",
        });
      }, timer);
    }
  };

  return (
    <>
      <Flex grow="1" direction="column" minH="100vh" gap="10  ">
        <DashboardHeader name={user.fullname}></DashboardHeader>
        {loading && <LoadingPlaceholder></LoadingPlaceholder>}
        {error && (
          <ErrorAlert message="Error please reload the page!"></ErrorAlert>
        )}
        {responseError.error && (
          <ErrorAlert message={responseError.message}></ErrorAlert>
        )}
        {responseSuccess.success && (
          <SuccessAlert message={responseSuccess.message}></SuccessAlert>
        )}
        {(() => {
          if (!loading && !error) {
            if (entries.length > 0) {
              return (
                <>
                  <DashboardCharts
                    entries={entries}
                    setEntries={setEntries}
                    handleRefreshEntries={handleRefreshEntries}
                    handleSearchEntries={handleSearchEntries}
                    form={form}
                    setForm={setForm}
                    isChecked={isImperial}
                    handleCheckedChange={setIsImperial}
                  ></DashboardCharts>
                  <ViewEntries entries={entries} isImperial={user.isImperial}></ViewEntries>
                </>
              );
            } else {
              return (
                <EmptyContainer
                  message={
                    "There are no entries to visualize data for! Start logging so we can start charting"
                  }
                ></EmptyContainer>
              );
            }
          }
        })()}
      </Flex>
    </>
  );
};

export default Dashboard;
