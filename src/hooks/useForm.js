import { useState } from "react";
import { useUser } from "../context/UserContext";
const handleOnchange = ({ e, formdata, setFormdata }) => {
  const { name, value } = e.target;
  setFormdata({
    ...formdata,
    [name]: value,
  });

  console.log(formdata);
};

export const useForm = (intialState) => {
  const [formdata, setFormdata] = useState(intialState);

  return {
    formdata,
    setFormdata,
    handleOnchange: (e) => handleOnchange({ e, formdata, setFormdata }),
  };
};
