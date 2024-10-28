import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/Container";
import { useUser } from "../context/UserContext";
import { TransactionChart } from "../components/TransactionChart";
import { useEffect } from "react";
// import { Line } from "react-chartjs";
// // const lineChart = chart.Line;

const Dashboard = () => {
  // const { user, transaction } = useUser();
  // // useEffect(() => {
  // //   <TransactionChart />;
  // // }, [TransactionChart]);
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        {/* <Col className="">Dashboard</Col> */}
        <Col>
          <TransactionChart />
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
