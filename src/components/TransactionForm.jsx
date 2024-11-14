import React, { useEffect } from "react";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm";
import { postTransaction } from "../helpers/axioshelpers";
import { useUser } from "../context/UserContext";
const initialState = {
  type: "",
  title: "",
  amount: "",
  tdate: "",
};

export const TransactionForm = () => {
  const { getTransaction, transaction, toggleShow, singletxn } = useUser();
  useEffect(() => {
    getTransaction();
  }, []);
  const { formdata, setFormdata, handleOnchange } = useForm(initialState);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const pending = postTransaction(formdata);
    toast.promise(pending, {
      pending: "please wait",
    });
    const { status, message } = await pending;

    toast[status](message);
    if (status === "success") {
      setFormdata(initialState);
      getTransaction();
      toggleShow(false);
    }
  };
  const fields = [
    {
      label: "Title:",
      type: "text",
      placeholder: "",
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
      <h4 className="mb-4">Add Your Transaction..</h4>
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
          <Button variant="primary" type="submit" onClick={handleOnSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
