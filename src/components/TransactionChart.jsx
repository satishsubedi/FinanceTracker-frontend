import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
import { FaBalanceScale } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useUser } from "../context/UserContext";
import { Container } from "react-bootstrap";
// import { CarouselItem, Row } from "react-bootstrap";
export const TransactionChart = () => {
  const { transaction, getTransaction } = useUser();
  const [charttransaction, setChartTransaction] = useState([]);

  useEffect(() => {
    transaction.length < 1 && getTransaction();
    setChartTransaction(transaction);
  }, [transaction]);

  const total = charttransaction.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const incomeTransaction = charttransaction.filter(
    (item) => item.type === "income" && item.createdAt.slice(0, 10)
  );
  console.log(incomeTransaction);
  const expenseTransaction = charttransaction.filter(
    (item) => item.type === "expense" && item.createdAt.slice(0, 10)
  );
  console.log(expenseTransaction);
  // expenseTransaction.createdAt = expenseTransaction?.createdAt?.slice(0, 10);
  // console.log(expenseTransaction);

  const expenseTxnArg = expenseTransaction.map((item) => ({
    ...item,
    createdAt: item.createdAt.slice(0, 10),
  }));
  console.log(expenseTxnArg);

  const incomeTxnArg = incomeTransaction.map((item) => ({
    ...item,
    createdAt: item.createdAt.slice(0, 10),
  }));
  console.log(incomeTxnArg);

  const income = charttransaction.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - 0;
  }, 0);

  const expense = charttransaction.reduce((acc, t) => {
    return t.type === "expense" ? acc + t.amount : acc - 0;
  }, 0);

  const data = [
    {
      name: "Income",
      value: income,
      fill: "#00C49F",
    },
    {
      name: "Expense",
      value: expense,
      fill: "#FF8042",
    },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col>
            {" "}
            <div className="bg-danger p-3 d-flex g-5">
              <div className="font-bolder">
                <FaBalanceScale />{" "}
              </div>
              <div>
                Balance
                <hr />
                {total}
              </div>
            </div>
          </Col>
          <Col>
            <div className="bg-success d-flex g-5 p-3">
              <div className="fs-xg">
                <FaMoneyBillTrendUp />
              </div>
              <div>
                Income
                <hr />
                {income}
              </div>
            </div>
          </Col>
          <Col>
            {" "}
            <div className="bg-warning d-flex p-3">
              <div></div> <FaMoneyBillTrendUp />
              <div>
                Expense
                <hr /> {expense}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <div>
              <PieChart width={500} height={250}>
                <Legend
                  height={36}
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  //   iconSize={10}
                  //   padding={5}
                  stroke="#ffffff"
                />
                <Pie
                  data={data}
                  dataKey="value"
                  outerRadius={120}
                  nameKey="name"
                  cx="25%"
                  cy="50%"
                />
              </PieChart>
            </div>
          </Col>
          <Col md={4}>
            {" "}
            <div>
              <LineChart
                width={300}
                height={250}
                data={incomeTxnArg}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey={"createdAt"}
                  // tickFormatter={formatXAxis("createdAt")}
                  // type={"category"}
                />
                <YAxis dataKey={"amount"} />
                <Tooltip />
                <Legend
                  verticalAlign="top"
                  dataKey={"type"}
                  iconType="square"
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  name="Income Amount"
                />
              </LineChart>
            </div>
          </Col>
          <Col md={4}>
            {" "}
            <div>
              <LineChart
                width={300}
                height={250}
                data={expenseTxnArg}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* {
                  const a = "createdAt".slice(0,10)
                } */}
                <XAxis dataKey={"createdAt"} />
                <YAxis dataKey={"amount"} />
                <Tooltip />
                <Legend verticalAlign="top" iconType="rect" />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  name="Expense Amount"
                />
              </LineChart>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <div>
            <BarChart width={730} height={250} data={transaction}>
              <XAxis dataKey={"type"} />
              <YAxis dataKey={"amount"} />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </div>
        </Row>
      </Container>
    </>
  );
};
