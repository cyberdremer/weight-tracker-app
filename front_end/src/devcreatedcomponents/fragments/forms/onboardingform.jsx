import GenericModal from "@/devcreatedcomponents/modal/genericmodal";
import { useState } from "react";
import {
  Button,
  Field,
  Input,
  InputGroup,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { SuccessAlert, ErrorAlert } from "@/devcreatedcomponents/alerts/alert";
import { protectedPostRequest, protectedPutRequest } from "@/utils/requests";
import SelectFragment from "../select";
import timer from "@/utils/timer";
import getFirstEmptyField from "@/utils/emtpyfield";

const units = createListCollection({
  items: ["kgs", "lbs"],
});

const OnboardingForm = () => {
  const [selectValue, setSelectValue] = useState([]);
  // lift visibility to the dashboard component
  const [visible, setVisible] = useState(true);

  const [error, setError] = useState({
    visbility: false,
    message: "",
  });

  const [success, setSuccess] = useState({
    visiblity: false,
    message: "",
  });

  const [form, setForm] = useState({
    height: "",
    dob: "",
    units: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.value);
    setForm({ ...form, units: e.value[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emptyField = getFirstEmptyField(form);
      if (emptyField) {
        throw new Error(emptyField.message);
      }
      const onboarding = {
        dob: form.dob,
        height: form.height,
        units: form.units,
      };
      const response = await protectedPutRequest(
        "/account/thirdparty",
        onboarding
      );

      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuccess({
        visiblity: true,
        message: response.data.message,
      });

      setVisible(!visible);
      setTimeout(() => {
        setSuccess({
          visiblity: false,
          message: "",
        });
      }, timer);
    } catch (error) {
      setError({
        visbility: true,
        message: error.message,
      });

      setTimeout(() => {
        setError({
          visbility: false,
          message: "",
        });
      });
    } finally {
    }
  };
  return (
    <>
      {error.visbility && <ErrorAlert message={error.message}></ErrorAlert>}
      {success.visiblity && (
        <SuccessAlert message={success.message}></SuccessAlert>
      )}
      <GenericModal
        title="Onboarding Form"
        open={visible}
        footer={
          <>
            <Button onClick={handleSubmit}>Submit Information</Button>
          </>
        }
        handleClose={() => setVisible(!visible)}
      >
        <Stack spacing={4}>
          <Text>
            Complete your profile so we can create more accurate diets for you!
          </Text>
          <Field.Root required>
            <Field.Label>
              Height: <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <InputGroup
              endElement={selectValue[0] === "lbs" ? "inches" : "centimeters"}
            >
              <Input
                name="height"
                placeholder="Enter your weight"
                value={form.height}
                onChange={handleChange}
              ></Input>
            </InputGroup>
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Date of Birth: <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              placeholder="Enter your date of birth"
            ></Input>
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Preferred Units:{" "}
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <SelectFragment
              selectItems={units}
              placeholder={"kgs"}
              name="units"
              handleClick={handleSelectChange}
              value={selectValue}
            ></SelectFragment>
          </Field.Root>
        </Stack>
      </GenericModal>
    </>
  );
};

export default OnboardingForm;
