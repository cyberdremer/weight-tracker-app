import DashboardHeader from "../fragments/dashboard/dashboardheader";
import WeightForm from "../fragments/forms/weight";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { SuccessAlert, ErrorAlert } from "../alerts/alert";
import { protectedPostRequest } from "@/utils/requests";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
const timer = env === "dev" ? devTimer : prodTimer;
const WeightSubmission = () => {
  const [form, setForm] = useState({
    weight: "",
    date: "",
    notes: "",
  });

  const handleTextChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [responseError, setResponseError] = useState({
    error: false,
    message: "",
  });

  const [responseSuccess, setResponseSuccess] = useState({
    success: false,
    message: "",
  });

  const handleEntrySubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await protectedPostRequest("/weight/entry", form);
      if (response.error) {
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
        <WeightForm
          handleEntrySubmission={handleEntrySubmission}
          handleChange={handleTextChange}
          form={form}
        ></WeightForm>
      </Flex>
    </>
  );
};

export default WeightSubmission;
