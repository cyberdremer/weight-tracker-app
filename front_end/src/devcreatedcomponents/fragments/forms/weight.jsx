import { useState } from "react";
import {
  Field,
  Input,
  InputGroup,
  Textarea,
  Fieldset,
  Stack,
  Button,
} from "@chakra-ui/react";

const WeightForm = ({ isImperial, handleEntrySubmission, handleChange, form }) => {


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
          <InputGroup endElement={isImperial ? "lbs" : "kgs"}>
            <Input type="number" name="weight" value={form.weight} onChange={handleChange}></Input>
          </InputGroup>
        </Field.Root>

        <Field.Root>
          <Field.Label>Date: </Field.Label>

          <Input type="date" name="date" value={form.date} onChange={handleChange}></Input>
        </Field.Root>
        <Field.Root>
          <Field.Label>Notes (Optional)</Field.Label>
          <Textarea
            placeholder="Add any notes about your day!"
            maxLength="100"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          ></Textarea>
          <Field.HelperText>Max 100 characters</Field.HelperText>
        </Field.Root>
      </Fieldset.Content>
      <Button type="submit" alignSelf="flex-start" minWidth="100%" onClick={handleEntrySubmission}>
        Submit Weight Entry
      </Button>
    </Fieldset.Root>
  );
};

export default WeightForm;
