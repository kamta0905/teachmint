import Card from "react-bootstrap/Card";
import PrimeButton from "../../atoms/PrimeButton";

function Cards(props) {
  return (
    <Card className={props.className}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
        <Card.Text>{props.children}</Card.Text>
        <PrimeButton />
      </Card.Body>
    </Card>
  );
}

export default Cards;
