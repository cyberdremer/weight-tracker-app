import {
  Fieldset,
  Stack,
  Field,
  Button,
  Input,
  HStack,
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
    dob: ""
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
        <HStack>
          <Field.Root required>
            <Field.Label>First Name:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input name="firstname" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>Last Name:
            <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input name="lastname" />
          </Field.Root>
        </HStack>

        <Field.Root required>
          <Field.Label>Date of Birth: 
          <Field.RequiredIndicator></Field.RequiredIndicator>
          </Field.Label>
          <Input name="dob" type="date"></Input>
        </Field.Root>

        <Field.Root required>
          <Field.Label>Email address:
          <Field.RequiredIndicator></Field.RequiredIndicator>
          </Field.Label>
          <Input name="email" type="email" />
        </Field.Root>

        <Field.Root required>
          <Field.Label>Password: 
          <Field.RequiredIndicator></Field.RequiredIndicator>
          </Field.Label>
          <Input name="password" type="password" />
        </Field.Root>

        <Field.Root required>
          <Field.Label>Confirm password: 
          <Field.RequiredIndicator></Field.RequiredIndicator>
          </Field.Label>
          <Input name="confirmpassword" type="password" />
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start" minWidth="100%">
        Create account
      </Button>
    </Fieldset.Root>
  );
};

export default SignUpForm;
