import { protectedDeleteRequest, protectedGetRequest } from "@/utils/requests";
import useFetchData from "../effects/hooks";
import DashboardHeader from "../fragments/dashboard/dashboardheader";
import DownloadDietCardContainer from "../fragments/downloadcardcontainer";
import { SuccessAlert, ErrorAlert } from "../alerts/alert";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
const timer = env === "dev" ? devTimer : prodTimer;

// const mockData = [
//   "poop",
//   "grass",
//   "mud",
//   "horse",
//   "ban this fool",
//   "really man",
//   "poop",
//   "grass",
//   "mud",
//   "horse",
//   "ban this fool",
//   "really man",
// ].map((entry, index) => {
//   return {
//     name: entry,
//     index,
//   };
// });
const DownloadDiets = () => {
  const [responseError, setResponseError] = useState({
    error: false,
    message: "",
  });

  const [responseSuccess, setResponseSuccess] = useState({
    success: false,
    message: "",
  });

  const { entries, error, loading, setEntries } = useFetchData(
    "/dietician/generateddiet"
  );
  const handleDownload = async (id) => {
    const dietId = id;
    try {
      const response = await protectedGetRequest(
        `/dietician/generateddiet/${dietId}`
      );
      if (!response.error) {
        throw new Error(response.error.message);
      }
      setResponseSuccess({
        success: true,
        message: response.data.message,
      });

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
  const handleDelete = async (id) => {
    const dietId = id;
    try {
      const response = await protectedDeleteRequest(
        `/dietician/generateddiet/${dietId}`
      );
      if (!response.error) {
        throw new Error(response.error.message);
      }
      setResponseSuccess({
        success: true,
        message: response.data.message,
      });
      setEntries(entries.filter((entry) => id !== entry.id));
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
      <Flex grow="1" direction="column" minHeight="100vh">
        {responseError.error && (
          <ErrorAlert message={responseError.message}></ErrorAlert>
        )}
        {responseSuccess.success && (
          <SuccessAlert message={responseSuccess.message}></SuccessAlert>
        )}
        <DashboardHeader></DashboardHeader>
        <DownloadDietCardContainer
          diets={entries}
          deleteDiet={handleDelete}
          downloadDiet={handleDownload}
        ></DownloadDietCardContainer>
      </Flex>
    </>
  );
};

export default DownloadDiets;
