import { useState } from "react";
const handleOnchange = ({ e, formdata, setFormdata }) => {
  const { name, value } = e.target;
  setFormdata({
    ...formdata,
    [name]: value,
  });
};
export const useForm = (intialState) => {
  const [formdata, setFormdata] = useState(intialState);

  return {
    formdata,
    setFormdata,
    handleOnchange: (e) => handleOnchange({ e, formdata, setFormdata }),
  };
};
