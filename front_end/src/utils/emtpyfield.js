import { Field } from "@chakra-ui/react";

const getFirstEmptyField = (form) => {
  for (const key of Object.keys(form)) {
    if (typeof form[key] === "string" && form[key] === "") {
      return {
        message: `${key} is empty! Please fill out ${key}`,
        empty: true,
      };
    }
  }
  return null;
};


export default getFirstEmptyField