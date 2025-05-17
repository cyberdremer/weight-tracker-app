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

const diets = createListCollection({
  items: [
    "None",
    "Vegan",
    "Mediteranean Diet",
    "Paloelithic Diet",
    "Pescatarian",
  ],
});

const AiDieticianForm = ({diet, goal, handleDietSelect, handleGoalSelect, handleGenerate}) => {
  // TODO lift the state up to the parent component.
  

  return (
    <>
      <Fieldset.Root
        size="lg"
        maxW="xl"
        alignSelf="normal"
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
              name={"goal"}
              value={goal}
              handleClick={handleGoalSelect}
            ></SelectFragment>
          </Field.Root>

          <Field.Root required>
            <Field.Root required>
              <Field.Label>
                Dietary Restrictions
                <Field.RequiredIndicator></Field.RequiredIndicator>
              </Field.Label>
              <SelectFragment
                selectItems={diets}
                placeholder={diets.at(0)}
                name={"diet"}
                value={diet}
                handleClick={handleDietSelect}
              ></SelectFragment>
            </Field.Root>
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit" alignSelf="flex-start" minWidth="100%" onClick={handleGenerate}>
          Generate Diet!
        </Button>
      </Fieldset.Root>
    </>
  );
};

export default AiDieticianForm;
