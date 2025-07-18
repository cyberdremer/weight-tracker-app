import {
  Button,
  Dialog,
  Portal,
  CloseButton,
  Input,
  Alert,
  Text,
  Stack,
} from "@chakra-ui/react";
import GenericModal from "../modal/genericmodal";

const DeleteAccountAlert = ({
  open,
  handleDelete,
  handleClose,
  value,
  onChange,
}) => {
  return (
    <GenericModal
      open={open}
      role="alertdialog"
      title="Deleting Account"
      handleClose={handleClose}
      handleDelete={handleDelete}
      footer={
        <>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              <Text>Cancel</Text>
            </Button>
          </Dialog.ActionTrigger>
          <Button colorPalette="red" onClick={handleDelete}>
            <Text>Delete</Text>
          </Button>
        </>
      }
    >
      <Stack gap="5">
        <Text>
          Are you sure you would like to delete your account? Enter your
          password below to confirm account deletion
        </Text>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
        ></Input>
      </Stack>
    </GenericModal>
  );
};

const SuccessAlert = ({ message }) => {
  return (
    <Alert.Root
      status="success"
      variant="subtle"
      animationName="slide-from-top"
      animationDuration="slowest"
      maxW="30%"
      alignSelf="center"
      position={"absolute"}
      marginTop={2}
    >
      <Alert.Indicator />
      <Alert.Title>{message}</Alert.Title>
    </Alert.Root>
  );
};

const ErrorAlert = ({ message }) => {
  return (
    <Alert.Root
      status="error"
      variant="subtle"
      animationName="slide-from-top"
      animationDuration="slowest"
      maxW="30%"
      alignSelf="center"
      position={"absolute"}
      marginTop={2}
    >
      <Alert.Indicator />
      <Alert.Title>{message}</Alert.Title>
    </Alert.Root>
  );
};

export { ErrorAlert, SuccessAlert, DeleteAccountAlert };
