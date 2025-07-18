import {
  Box,
  CloseButton,
  Dialog,
  Portal,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";

const GenericModal = ({
  open,
  children,
  title,
  role,
  footer,
  handleClose,
}) => {
  return (
    <>
      <Dialog.Root open={open} motionPreset="slide-in-top" role={role}>
        <Portal>
          <Dialog.Backdrop></Dialog.Backdrop>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>{children}</Dialog.Body>
              <Dialog.Footer>
                {footer}
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton onClick={handleClose} size="sm"></CloseButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};



export default GenericModal;
