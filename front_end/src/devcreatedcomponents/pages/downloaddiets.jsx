import {
  protectedDeleteRequest,
  protectedGetRequest,
  protectedDeleteRequestWithoutForm,
  protectedGetRequestDownload,
} from "@/utils/requests";
import { useFetchData, useFetchDiets } from "../effects/hooks";
import DashboardHeader from "../fragments/dashboard/dashboardheader";
import DownloadDietCardContainer from "../fragments/downloadcardcontainer";
import { SuccessAlert, ErrorAlert } from "../alerts/alert";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";
import LoadingPlaceholder from "../fragments/loading";
import EmptyContainer from "../fragments/emptycontainer";
import download from "downloadjs";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
const timer = env === "dev" ? devTimer : prodTimer;


const DownloadDiets = () => {
  const [responseError, setResponseError] = useState({
    error: false,
    message: "",
  });

  const [responseSuccess, setResponseSuccess] = useState({
    success: false,
    message: "",
  });

  const { diets, error, loading, setDiets } = useFetchDiets(
    "/dietician/generateddiet"
  );
  const handleDownload = async (id) => {
    const dietId = id;
    try {
      const response = await protectedGetRequestDownload(
        `/dietician/generateddiet/${dietId}`
      );
      download(response);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setResponseSuccess({
        success: true,
        message: "File has been succesfully downloaded",
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
      const response = await protectedDeleteRequestWithoutForm(
        `/dietician/generateddiet/${dietId}`
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      setResponseSuccess({
        success: true,
        message: response.data.message,
      });
      setDiets(diets.filter((diet) => id !== diet.id));
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

        {error && (
          <ErrorAlert
            message={"An error has occurred, please refresh the page"}
          ></ErrorAlert>
        )}
        {loading && <LoadingPlaceholder></LoadingPlaceholder>}
        {(() => {
          if (!loading) {
            if (diets.length > 0) {
              return (
                <DownloadDietCardContainer
                  diets={diets}
                  deleteDiet={handleDelete}
                  downloadDiet={handleDownload}
                ></DownloadDietCardContainer>
              );
            } else {
              return (
                <EmptyContainer
                  message="There are no diets to download, generate some and comeback to download
                  and manage them!"
                ></EmptyContainer>
              );
            }
          }
        })()}
      </Flex>
    </>
  );
};


export default DownloadDiets;
