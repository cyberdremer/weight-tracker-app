import { Fieldset, Stack, Field, Input, Button, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SuccessAlert, ErrorAlert } from "@/devcreatedcomponents/alerts/alert";
import { postRequest } from "@/utils/requests";
import { AuthContext } from "@/devcreatedcomponents/context/AuthContext";
import { InfoContext } from "@/devcreatedcomponents/context/InfoContext";
import { useNavigate } from "react-router";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
const timer = env === "dev" ? devTimer : prodTimer;
const LogInForm = () => {
  const { setAuthed } = useContext(AuthContext);
  const { user, clearUser, updateUser } = useContext(InfoContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    message: "",
    occurred: false,
  });

  const [success, setSuccess] = useState({
    message: "",
    occurred: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await postRequest("/login", form);
      if (response.error) {
        throw new Error(`${response.error.message}`);
      }
      setSuccess({
        message: response.data.message,
        occurred: true,
      });
      updateUser(response.data.user);
      setAuthed(true);

      setTimeout(() => {
        setSuccess({
          message: "",
          occurred: false,
        });
        navigate("/login/dashboard");
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
      {success.occurred && (
        <SuccessAlert message={success.message}></SuccessAlert>
      )}
      {error.occurred && <ErrorAlert message={error.message}></ErrorAlert>}
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
          <Field.Root required>
            <Field.Label>
              Email: <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password: <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit" minWidth="100%" onClick={handleLogin}>
          Log in
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default LogInForm;
