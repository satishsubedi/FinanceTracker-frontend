import Modal from "react-bootstrap/Modal";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export const CustomModal = ({ children }) => {
  const { show, toggleShow, getTransaction } = useUser();
  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <Modal
      show={show}
      onHide={() => toggleShow(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
