import React from "react";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm";
import { useUser } from "../context/UserContext";

const handleOnUpdate = (e) => {
  e.preventDefault();
  console.log(formdata);
};

export const TransactionEditForm = () => {
  const { singletxn } = useUser();
  console.log(singletxn.amount);
  const initialState = {
    type: singletxn.type,
    title: singletxn.title,
    amount: singletxn.amount,
    tdate: singletxn.tdate.slice(0, 10),
  };
  const { formdata, setFormdata, handleOnchange } = useForm(initialState);
  const fields = [
    {
      label: "Title:",
      type: "text",
      placeholder: "formdata.title",
      required: true,
      name: "title",
      value: formdata.title,
    },
    {
      label: "Amount:",
      type: "Number",
      placeholder: "0.0",
      required: true,
      name: "amount",
      value: formdata.amount,
    },
    {
      label: "Transaction Date:",
      type: "date",
      placeholder: "",
      required: true,
      name: "tdate",
      value: formdata.tdate,
    },
  ];
  return (
    <div className="border rounded p-3">
      <h4 className="mb-4">Edit Your Transaction..</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Transaction Type</Form.Label>
          <Form.Select name="type" onChange={handleOnchange}>
            <option value="">--Select--</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Form.Group>

        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnchange} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit" onClick={handleOnUpdate}>
            Edit
          </Button>
        </div>
      </Form>
    </div>
  );
};
