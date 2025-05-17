import {
  Field,
  Input,
  Stack,
  Fieldset,
  Button,
  createListCollection,
  Avatar,
  InputGroup,
} from "@chakra-ui/react";
import SelectFragment from "../select";
import { useContext, useState } from "react";
import {
  DeleteAccountAlert,
  ErrorAlert,
  SuccessAlert,
} from "@/devcreatedcomponents/alerts/alert";
import { red } from "@mui/material/colors";
import { InfoContext } from "@/devcreatedcomponents/context/InfoContext";
import {
  convertCentimetersToFeet,
  convertCentimeteresToMeters,
} from "@/utils/unitconversions";
import { protectedDeleteRequest, protectedPostRequest } from "@/utils/requests";
import timer from "@/utils/timer";
import { useNavigate } from "react-router";

const units = createListCollection({
  items: ["kgs", "lbs"],
});

const AccountInformation = ({ name, email, dob }) => {
  const navigate = useNavigate();
  // TODO Handle all the updating in this component, only handle visibility of errors  in hte parent component.
  const { user, setUser } = useContext(InfoContext);
  const [deleteVisbility, setDeleteVisibility] = useState(false);

  const [success, setSuccess] = useState({
    message: "",
    occurred: false,
  });

  const [error, setError] = useState({
    message: "",
    occurred: false,
  });

  const setVisibility = () => {
    setDeleteVisibility(!deleteVisbility);
  };

  const [form, setForm] = useState({
    height: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const height =
    user.isImperial === true
      ? convertCentimetersToFeet(user.height)
      : convertCentimeteresToMeters(user.height);

  // TODO Add handle delete and handle change functions

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await protectedDeleteRequest("/account/delete", {
        password: form.password,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuccess({
        message:
          "Account has been succesfully deleted. Redirecting you to the homepage",
        occurred: true,
      });
      setTimeout(() => {
        setSuccess({
          message: "",
          occurred: false,
        });
        navigate("/");
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

  const handleUpdateHeight = async (e) => {
    e.preventDefault();
    try {
      const response = await protectedPostRequest("/account/update", {
        height: form.height,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }

      setSuccess({
        message: response.data.message,
        occurred: true,
      });

      setUser({ ...user, height: form.height });

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
      });
    }
  };

  return (
    <>
      {error.occurred && <ErrorAlert message={error.message}></ErrorAlert>}
      {success.occurred && (
        <SuccessAlert message={success.message}></SuccessAlert>
      )}
      <DeleteAccountAlert
        open={deleteVisbility}
        handleDelete={handleDelete}
        handleClose={setVisibility}
        value={form.password}
        onChange={handleChange}
      ></DeleteAccountAlert>
      <Fieldset.Root
        size="lg"
        maxW="md"
        alignSelf="center"
        animationName="fade-in"
        animationDuration="slowest"
        marginTop="3rem"
      >
        <Stack>
          <Avatar.Root alignSelf="center" size="2xl">
            <Avatar.Fallback
              name={user.fullname || "Ai Artist"}
            ></Avatar.Fallback>
          </Avatar.Root>
          <Fieldset.Legend>Account Details</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>
              Full Name:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input name="fullname" value={user.fullname} disabled />
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Email address:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input name="email" type="email" value={user.email} disabled />
          </Field.Root>
          <Field.Root>
            <Field.Label>Date of Birth:</Field.Label>
            <Input
              name="dob"
              value={new Date(user.dob).toDateString()}
              disabled
            ></Input>
          </Field.Root>

          <Field.Root>
            <Field.Label>Height:</Field.Label>
            <InputGroup endElement={user.isImperial === true ? "ft" : "cm"}>
              <Input
                name="height"
                placeholder={
                  user.isImperial === true
                    ? convertCentimetersToFeet(user.height)
                    : convertCentimeteresToMeters(user.height)
                }
                type="number"
              ></Input>
            </InputGroup>
          </Field.Root>

          <Field.Root>
            <Field.Label>Change height </Field.Label>
            <InputGroup endElement={user.isImperial === true ? "in" : "cm"}>
              <Input name="newheight" type="number"></Input>
            </InputGroup>
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start" minWidth="100%">
          Update Account Information
        </Button>
        <Button
          type="submit"
          alignSelf="flex-start"
          minWidth="100%"
          background={"red"}
          onClick={setVisibility}
        >
          Delete Account
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default AccountInformation;
