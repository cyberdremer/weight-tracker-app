import {
  Fieldset,
  Stack,
  Field,
  Button,
  Input,
  NativeSelect,
  For,
} from "@chakra-ui/react";
import { useState } from "react";

const SignUpForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

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
        <Fieldset.Legend>Sign Up details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please enter your sign up details
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>First Name:</Field.Label>
          <Input name="firstname" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Last Name:</Field.Label>
          <Input name="lastname" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address:</Field.Label>
          <Input name="email" type="email" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password: </Field.Label>
          <Input name="password" type="password" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Confirm password: </Field.Label>
          <Input name="confirmpassword" type="password" />
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start" minWidth="100%">
        Submit
      </Button>
    </Fieldset.Root>
  );
};

export default SignUpForm;
