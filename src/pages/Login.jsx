import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/Container";
import { SignUpForm } from "../components/SignUpForm";
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineFall } from "react-icons/ai";
import { CustomInput } from "../components/CustomInput";
import { SignInForm } from "../components/SignInForm";

const Login = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col md={6}>
          <SignInForm />
        </Col>
        <Col md={6}>
          <div
            className="d-flex flex-column justify-content-center"
            style={{
              height: "100%",
            }}
          >
            <div className="text-danger text-decoration-line-through ">
              {" "}
              <AiOutlineFall style={{ fontSize: "48px", color: "red" }} />{" "}
              Reduce your Expenses
            </div>
            <div className="text-success">
              {" "}
              <AiOutlineRise
                style={{ fontSize: "48px", color: "green" }}
              />{" "}
              Increase your Income
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
