"use client";
import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const interTheme = {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Inter Variable" },
        body: { value: "Inter Variable" },
      },
      colors: {
        dark: {},
        light: {
          background: {value: "#ffbb3d"}
        },
      },
    },
  },
};

const interConfig = defineConfig(interTheme);


export const interSystem = createSystem(defaultConfig, interConfig )