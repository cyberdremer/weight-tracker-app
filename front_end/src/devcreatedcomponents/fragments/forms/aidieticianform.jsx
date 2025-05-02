import {
  createListCollection,
  Field,
  Fieldset,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import SelectFragment from "../select";

const goals = createListCollection({
  items: ["Maintain Weight", "Lose Weight", "Gain Weight"],
});

const diet = createListCollection({
  items: [
    "None",
    "Vegan",
    "Mediteranean Diet",
    "Paloelithic Diet",
    "Pescatarian",
  ],
});

const AiDieticianForm = () => {
  const [form, setForm] = useState({
    goal: "",
    diet: "",
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
            Submit your details so that an AI Dietician can craft a diet just
            for you!
          </Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>
              Weight Goal:
              <Field.RequiredIndicator></Field.RequiredIndicator>
            </Field.Label>
            <SelectFragment
              selectItems={goals}
              placeholder={goals.at(0)}
              name="goal"
            ></SelectFragment>
          </Field.Root>

          <Field.Root required>
            <Field.Root required>
              <Field.Label>
                Dietary Restrictions
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <SelectFragment
                selectItems={diet}
                placeholder={diet.at(0)}
                name="diet"
              ></SelectFragment>
            </Field.Root>
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit" alignSelf="flex-start" minWidth="100%">
          Generate Diet!
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default AiDieticianForm;
