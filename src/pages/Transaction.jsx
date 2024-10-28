import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/Container";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";
import { CustomModal } from "../components/CustomModal";
import { TransactionEditForm } from "../components/TransactionEditForm";
import { useUser } from "../context/UserContext";

const Transaction = () => {
  const { singletxn } = useUser();
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded g-3">
        <CustomModal>
          {singletxn?._id ? <TransactionEditForm /> : <TransactionForm />}
        </CustomModal>
        <TransactionTable />
      </Row>
    </Container>
  );
};
export default Transaction;
