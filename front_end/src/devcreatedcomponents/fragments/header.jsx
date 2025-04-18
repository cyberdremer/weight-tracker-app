import {
  Link,
  Group,
  HStack,
  Heading,
  StackSeparator,
  Separator,
  Button,
} from "@chakra-ui/react";

const Header = ({}) => {
  return (
    <>
      <HStack justifyContent="space-between" alignContent="center" padding="4" shadow="xl" >
        <Heading size="5xl">Weight.Tracker</Heading>
        <Group gap="6">
          <Link href="/">Home</Link>
          <Link href="/login">Log In</Link>
          <Link href="/signup">Sign Up</Link>
        </Group>
        
      </HStack>
      <Separator></Separator>
      
    </>
  );
};

export default Header;
