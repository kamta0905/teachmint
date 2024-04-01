import Button from "react-bootstrap/Button";

const PrimeButton = (props) => {
  return (
    <Button
      className={props.className}
      type={props.type}
      disabled={props.disabled}
      id={props.id}
      onClick={props.onClick}
      variant={props.variant}
    >
      {props.children}
    </Button>
  );
};

export default PrimeButton;
