import DashboardHeader from "../fragments/dashboard/dashboardheader";
import { Flex, HStack, VStack, Box, Button, Heading } from "@chakra-ui/react";
import AiDieticianForm from "../fragments/aidietician/aidieticianform";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SuccessAlert, ErrorAlert } from "../alerts/alert";
import {
  protectedPostRequestJSON,
  protectedPostRequestDownload,
  protectedDeleteRequest,
  protectedPostRequest,
} from "@/utils/requests";
import AiDieticianResponseContainer from "../fragments/aidietician/aidieticianresponsecontainer";
import download from "downloadjs";
import EmptyContainer from "../fragments/emptycontainer";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
const timer = env === "dev" ? devTimer : prodTimer;



const AiDietician = () => {
  const [error, setError] = useState({
    message: "",
    occurred: false,
  });
  const [success, setSuccess] = useState({
    message: "",
    occurred: false,
  });
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    goal: "",
    diet: "",
  });

  const [select, setSelect] = useState({ goal: "", diet: "" });
  const handleDietSelect = (e) => {
    setSelect({ ...select, diet: e.value });
    setForm({ ...form, diet: e.value[0] });
  };

  const handleGoalSelect = (e) => {
    setSelect({ ...select, goal: e.value });
    setForm({ ...form, goal: e.value[0] });
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      if (!data && data.length === 0) {
        throw new Error("No diet data to download!");
      }
      const response = await protectedPostRequestDownload(
        "/dietician/generatedietpdf",
        data
      );
      download(response);

      setSuccess({
        message: "PDF downloaded succesfully!",
        occurred: true,
      });
      setTimeout(() => {
        setSuccess({
          message: "",
          occurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        occurred: true,
      });

      setTimeout(() => {
        setError({
          message: "",
          ocurred: false,
        });
      }, timer);
    }
  };
  const handleSaveToAccount = async (e) => {
    e.preventDefault();
    try {
      if (!data || data.length === 0) {
        throw new Error("No diet data to save!");
      }
      const response = await protectedPostRequestJSON(
        "/dietician/savediet",
        data
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuccess({
        message: response.data.message,
        occurred: true,
      });

      setTimeout(() => {
        setSuccess({
          message: "",
          occurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        occurred: true,
      });
      setTimeout(() => {
        setError({
          message: "",
          occurred: false,
        });
      }, timer);
    }
  };
  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await protectedPostRequest("/dietician", form);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuccess({
        message: response.data.message,
        occurred: true,
      });
      setData(response.data.diet);
      setTimeout(() => {
        setSuccess({
          message: "",
          occurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        occurred: true,
      });
      setTimeout(() => {
        setError({
          message: "",
          occurred: false,
        });
      }, timer);
    }
  };

  return (
    <>
      <Flex grow="1" direction="column" minH="100vh">
        <DashboardHeader></DashboardHeader>
        {error.occurred && <ErrorAlert message={error.message}></ErrorAlert>}
        {success.occurred && (
          <SuccessAlert message={success.message}></SuccessAlert>
        )}
        <HStack gap="5" margin="10">
          <AiDieticianForm
            diet={select.diet}
            goal={select.goal}
            handleDietSelect={handleDietSelect}
            handleGoalSelect={handleGoalSelect}
            handleGenerate={handleGenerate}
          ></AiDieticianForm>
          {/* TODO Add conditional rendering for when the user has not generated a diet yet. */}
          {data.length > 0 ? (
            <>
              <AiDieticianResponseContainer
                response={data}
                handleDownload={handleDownload}
                handleSaveToAccount={handleSaveToAccount}
              ></AiDieticianResponseContainer>
            </>
          ) : (
            <>
              <EmptyContainer message="You have not generated a diet, press the generate button!"></EmptyContainer>
            </>
          )}
        </HStack>
      </Flex>
    </>
  );
};

const EmptyAiDietician = () => {};

export default AiDietician;
