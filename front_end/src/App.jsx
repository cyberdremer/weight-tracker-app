import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, Container, HStack, Flex } from "@chakra-ui/react";
import LandingPage from "./devcreatedcomponents/pages/landingpage";
import SignUp from "./devcreatedcomponents/pages/signup";
import LoginPage from "./devcreatedcomponents/pages/login";
import { InfoProvider } from "./devcreatedcomponents/context/InfoContext";
import { BrowserRouter } from "react-router";
import PageRoutes from "./pageroutes/pageroutes";

function App() {
  return (
    <Container minHeight="100vh" maxWidth="100%" padding="0" margin="0">
      <InfoProvider>
        <BrowserRouter>
          <PageRoutes></PageRoutes>
        </BrowserRouter>
      </InfoProvider>
    </Container>
  );
}

export default App;
