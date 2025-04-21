import { useState } from "react";
import { Field, Input, InputGroup, Textarea, Fieldset, Stack } from "@chakra-ui/react";

const WeightForm = ({ isImperial }) => {
  const [form, setForm] = useState({
    weight: "",
    date: "",
    notes: "",
  });

  const handleTextChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Fieldset.Root
      size="lg"
      maxW="lg"
      maxH="lg"
      alignSelf="center"
      animationName="fade-in"
      animationDuration="slowest"
      marginTop="3rem"
  
      borderRadius="md"
    >
      <Stack>
        <Fieldset.Legend>Enter your weight for today!</Fieldset.Legend>
      </Stack>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Weight: </Field.Label>

          <Input type="number" name="weight"></Input>
        </Field.Root>

        <Field.Root>
          <Field.Label>Date: </Field.Label>
          <InputGroup endElement={isImperial ? "lbs" : "kgs"}>
            <Input type="date" name="date"></Input>
          </InputGroup>
        </Field.Root>
        <Field.Root>
          <Field.Label>Notes (Optional)</Field.Label>
          <Textarea
            placeholder="Add any notes about your day!"
            maxLength="100"
            name="notes"
          ></Textarea>
          <Field.HelperText>Max 100 characters</Field.HelperText>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};


export default WeightForm;
