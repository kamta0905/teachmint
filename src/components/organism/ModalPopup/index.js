import Modal from "react-bootstrap/Modal";
import PrimeButton from "../../atoms/PrimeButton";

function ModalPopup(props) {
  return (
    <Modal {...props} size={props.size} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.heading}</h4>
        <div>{props.children}</div>
      </Modal.Body>
      <Modal.Footer>
        <PrimeButton onClick={props.submitForm} variant="success" type="submit">
          {props.submit}
        </PrimeButton>
        <PrimeButton onClick={props.onHide} variant="outline-danger" type="submit">
          {props.close}
        </PrimeButton>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalPopup;
