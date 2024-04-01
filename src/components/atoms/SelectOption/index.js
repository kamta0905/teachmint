import Form from "react-bootstrap/Form";

const SelectOption = (props) => {
  return (
    <Form.Select
      name={props.name}
      value={props.value}
      className={props.className}
      onChange={props.onChange}
      aria-label="Default select example"
    >
      {props.children}
    </Form.Select>
  );
};

export default SelectOption;
