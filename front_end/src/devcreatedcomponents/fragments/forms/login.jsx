import { Fieldset, Stack, Field, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const LogInForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Fieldset.Root
        size="lg"
        maxW="md"
        alignSelf="center"
        animationName="fade-in"
        animationDuration="slowest"
        marginTop="4rem"
      >
        <Stack>
          <Fieldset.Legend>
            <Text fontSize="2xl">Log In details</Text>
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Enter your log in details below
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input type="email" name="email" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input type="password" name="password" />
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit" minWidth="100%">
          Submit
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default LogInForm;
