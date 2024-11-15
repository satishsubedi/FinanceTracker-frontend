import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postUser } from "../helpers/axioshelpers";
import { useForm } from "../hooks/useForm";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};
export const SignUpForm = () => {
  const { formdata, setFormdata, handleOnchange } = useForm(initialState);
  const [showpassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
      type: showpassword ? "text" : "password",
      placeholder: "Enter Password ",
      required: true,
      name: "password",
      value: formdata.password,
    },
    {
      type: showpassword ? "text" : "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      required: true,
      name: "confirmpassword",
      value: formdata.confirmpassword,
    },
  ];
  const handleOnShowPassword = () => {
    setShowPassword(!showpassword);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    const pattern = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`;
    console.log(typeof pattern);
    const { confirmpassword, ...rest } = formdata;
    if (!rest.password.match(pattern)) {
      return toast(
        "Password should be 8-20 characters and include atleast 1 letter 1 number and 1 special character"
      );
    }
    if (confirmpassword !== rest.password) {
      return toast.error("Password does not matched!!");
    }

    const pendingResponse = postUser(rest);
    toast.promise(pendingResponse, { pending: "PLEASE WAIT......." });

    const { status, message } = await pendingResponse;
    toast[status](message);
    status === "success" && setFormdata(initialState);
    setDisabled(true);
  };

  return (
    <div className="border rounded p-3">
      <h4 className="mb-4">Signup Here</h4>
      <Form>
        {fields.map((input) => (
          <CustomInput
            key={input.name}
            {...input}
            onChange={handleOnchange}
            onClick={() => setDisabled(false)}
          />
        ))}

        <div className="password-eye">
          {!showpassword ? (
            <AiFillEye onClick={handleOnShowPassword} />
          ) : (
            <AiFillEyeInvisible onClick={handleOnShowPassword} />
          )}
        </div>

        <div className="d-grid">
          <Button
            variant="primary"
            type="submit"
            onClick={handleOnSubmit}
            disabled={disabled}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
