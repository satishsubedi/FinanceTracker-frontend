import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postUser } from "../helpers/axioshelpers";
import { useForm } from "../hooks/useForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};
export const SignUpForm = () => {
  const { formdata, setFormdata, handleOnchange } = useForm(initialState);
  const fields = [
    {
      label: "Name",
      type: "text",
      placeholder: "Enter Name",
      required: true,
      name: "name",
      value: formdata.name,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter Email",
      required: true,
      name: "email",
      value: formdata.email,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      required: true,
      name: "password",
      value: formdata.password,
    },
    {
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      required: true,
      name: "confirmpassword",
      value: formdata.confirmpassword,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmpassword, ...rest } = formdata;
    if (confirmpassword !== rest.password) {
      return toast.error("Password does not matched!!");
    }
    // setFormdata(rest);
    const { status, message } = await postUser(rest);
    toast[status](message);
    status === "success" && setFormdata(initialState);
  };

  return (
    <div className="border rounded p-3">
      <h4 className="mb-4">Signup Here</h4>
      <Form>
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
