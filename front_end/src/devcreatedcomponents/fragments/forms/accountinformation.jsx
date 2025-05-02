import {
  Field,
  Input,
  Stack,
  Fieldset,
  Button,
  createListCollection,
} from "@chakra-ui/react";
import SelectFragment from "../select";
import { useState } from "react";
import { DeleteAccountAlert } from "@/devcreatedcomponents/alerts/alert";
import { red } from "@mui/material/colors";

const units = createListCollection({
  items: ["kgs", "lbs"],
});

const AccountInformation = ({ name, email, dob }) => {
  // TODO Handle all the updating in this component, only handle visibility of errors  in hte parent component.

  const [deleteVisbility, setDeleteVisibility] = useState(false);
  const setVisibility = () => {
    setDeleteVisibility(!deleteVisbility);
  };

  const [form, setForm] = useState({
    fullname: "",
    units: "",
  });

  // TODO Add handle delete and handle change functions

  const handleDelete = () => {};
  const handleChange = (e) => {};
  return (
    <>
      <DeleteAccountAlert
        open={deleteVisbility}
        handleDelete={handleDelete}
        handleClose={setVisibility}
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
          <Fieldset.Legend>Account Details</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>
              Full Name:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input name="fullname" value={name} onChange={handleChange} />
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Email address:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input name="email" type="email" value={email} disabled />
          </Field.Root>
          <Field.Root>
            <Field.Label>Date of Birth:</Field.Label>
            <Input name="dob" type="date" value={dob} disabled></Input>
          </Field.Root>

          <Field.Root>
            <SelectFragment
              selectItems={units}
              placeholder={"kgs"}
              label={"Enter your desired units"}
              name="units"
              handleClick={handleChange}
            ></SelectFragment>
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
