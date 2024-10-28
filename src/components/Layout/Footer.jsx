import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Footer = () => {
  return (
    <Container fluid className="bg-dark ">
      <Row className="text-center p-3">
        <Col> &copy Copy right all reserved. Satish Subedi</Col>
      </Row>
    </Container>
  );
};
