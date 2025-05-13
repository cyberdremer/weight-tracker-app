import {
  Fieldset,
  Stack,
  Field,
  Button,
  Input,
  HStack,
  createListCollection,
  NativeSelect,
  For,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import SelectFragment from "../select";
import { SuccessAlert, ErrorAlert } from "@/devcreatedcomponents/alerts/alert";
import { postRequest } from "@/utils/requests";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
const timer = env === "dev" ? devTimer : prodTimer;

const units = createListCollection({
  items: ["kgs", "lbs"],
});

const SignUpForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    dob: "",
    units: "",
    signupcode: "",
    height: "",
  });

  const [selectValue, setSelectValue] = useState([]);

  const [error, setError] = useState({
    message: "",
    occurrred: false,
  });

  const [success, setSuccess] = useState({
    message: "",
    occurrred: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setForm({ ...form, [name]: e.target.value });
  };
  const handleSelectChange = (e) => {
    setSelectValue(e.value);
    setForm({ ...form, units: e.value[0] });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await postRequest("/signup", form);
      if (response.error) {
        throw new Error(`${response.error.messsage}`);
      }
      setSuccess({
        message: response.data.message,
        occurrred: true,
      });
      setTimeout(() => {
        setSuccess({
          messsage: "",
          occurrred: false,
        });
      }, timer);
    } catch (err) {
      setError({
        message: err.message,
        occurrred: true,
      });

      setTimeout(() => {
        setError({
          message: "",
          occurrred: false,
        });
      }, timer);
    }
  };

  return (
    <>
      {success.occurrred && (
        <SuccessAlert message={success.message}></SuccessAlert>
      )}
      {error.occurrred && <ErrorAlert message={error.message}></ErrorAlert>}
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
              <Field.Label>
                First Name:
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Last Name:
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <Input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
              />
            </Field.Root>
          </HStack>

          <Field.Root required>
            <Field.Label>
              Date of Birth:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
            ></Input>
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Email address:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Desired Units:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <SelectFragment
              selectItems={units}
              placeholder={"kgs"}
              label={""}
              name="units"
              handleClick={handleSelectChange}
              value={selectValue}
            ></SelectFragment>
          </Field.Root>

          <Field.Root>
            <Field.Label>Height:</Field.Label>
            
              
                <Input
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                ></Input>
             
          
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Password:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>

            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Confirm password:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="confirmpassword"
              type="password"
              value={form.confirmpassword}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Signup Code: (Case Sensitive)
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <Input
              name="signupcode"
              type="input"
              value={form.signupcode}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          minWidth="100%"
          onClick={handleSignUp}
        >
          Create account
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default SignUpForm;
