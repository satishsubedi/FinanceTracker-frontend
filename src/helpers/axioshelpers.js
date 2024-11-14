import axios from "axios";
const rootApiEP = import.meta.env.VITE_ROOT_API + "/api/v1";

const getToken = () => {
  return localStorage.getItem("jwttoken");
};
const apiProcessor = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error?.response?.data?.error || error.message,
    };
  }
};

export const postUser = async (data) => {
  const obj = {
    method: "post",
    url: rootApiEP + "/users",
    data,
  };
  return apiProcessor(obj);
};

export const loginUser = async (data) => {
  const obj = {
    method: "post",
    url: rootApiEP + "/users/login",
    data,
  };
  return apiProcessor(obj);
};
export const getUser = async (data) => {
  const obj = {
    method: "get",
    url: rootApiEP + "/users",
    headers: {
      Authorization: getToken(),
    },
  };
  return apiProcessor(obj);
};

//Post the transaction
export const postTransaction = async (data) => {
  const obj = {
    method: "post",
    url: rootApiEP + "/transaction",
    headers: {
      Authorization: getToken(),
    },
    data,
  };
  return apiProcessor(obj);
};

// Fetch the transacton details
export const fetchTransaction = async () => {
  const obj = {
    method: "get",
    url: rootApiEP + "/transaction",
    headers: {
      Authorization: getToken(),
    },
  };
  return apiProcessor(obj);
};
// Get Transaction by ID
export const getTransactionbyID = async (id) => {
  const obj = {
    method: "get",
    url: rootApiEP + "/transaction/" + id,
    headers: {
      Authorization: getToken(),
    },
    // params: {
    //   _id: id,
    // },
  };

  return apiProcessor(obj);
};

// Delete transaction
export const deleteTransaction = async (data) => {
  const obj = {
    method: "delete",
    url: rootApiEP + "/transaction",
    headers: {
      Authorization: getToken(),
    },
    data,
  };
  return apiProcessor(obj);
};

//Edit Transaction
export const editTransaction = async (data) => {
  const obj = {
    method: "patch",
    url: rootApiEP + "/transaction",
    headers: {
      Authorization: getToken(),
    },
    data,
  };
  return apiProcessor(obj);
};
