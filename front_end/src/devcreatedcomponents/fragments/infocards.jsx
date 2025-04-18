import { Card, Avatar } from "@chakra-ui/react";
const InfoCards = ({ title, description, image }) => {
  return (
    <Card.Root width="320px">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
};


export default InfoCards;
