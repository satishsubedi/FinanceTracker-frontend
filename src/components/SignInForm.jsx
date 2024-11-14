import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { loginUser, postUser } from "../helpers/axioshelpers";
import { useForm } from "../hooks/useForm";
import { useUser } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
const initialState = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { formdata, setFormdata, handleOnchange } = useForm(initialState);

  useEffect(() => {
    user?._id && navigate(goTo);
  }, [user?._id, navigate]);

  const goTo = location?.state?.from?.pathname || "/dashboard";

  const fields = [
    {
      label: "Email",
      type: "email",
      placeholder: "Enter Email   ",
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
  ];

  console.log(formdata);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (formdata.password === "" || formdata.email === "") {
      toast("please enter the name and password");
    } else {
      console.log(formdata);
      const pendingResponse = loginUser(formdata);
      // toast.promise(pendingResponse, { pending: "please wait..." });
      const { status, message, user, token } = await pendingResponse;
      console.log({ status, message, user, token });
      toast[status](message);
      setUser(user);
      localStorage.setItem("jwttoken", token);
    }
  };

  return (
    <div className="border rounded p-3">
      <h4 className="mb-4">Signup Here</h4>
      <Form>
        {fields.map((input) => (
          <CustomInput key={input.email} {...input} onChange={handleOnchange} />
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
