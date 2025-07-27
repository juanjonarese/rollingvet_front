import Modal from "react-bootstrap/Modal";
import LoginScreen from "../pages/LoginScreen";

const LoginModalApp = (props) => {
  const { show, handleClose } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <LoginScreen handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModalApp;
