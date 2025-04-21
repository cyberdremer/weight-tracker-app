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

const units = createListCollection({
  items: ["kgs", "lbs"],
});

const AccountInformation = ({ name, email, dob }) => {
  return (
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
          <Input name="fullname" value={name} disabled />
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
          <Input name="dob" type="date" value={dob}></Input>
        </Field.Root>

        <Field.Root>
          <SelectFragment selectItems={units}></SelectFragment>
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start" minWidth="100%">
        Update Account Information
      </Button>
    </Fieldset.Root>
  );
};

export default AccountInformation;
