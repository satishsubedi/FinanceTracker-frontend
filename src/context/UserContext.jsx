import { createContext, useContext, useState } from "react";
import { fetchTransaction, getTransactionbyID } from "../helpers/axioshelpers";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transaction, setTransaction] = useState([]);
  const [singletxn, setSingleTxn] = useState({});
  const [show, setShow] = useState(false);
  const toggleShow = (value) => setShow(value);
  const [disabled, setDisabled] = useState(false);

  const getTransaction = async () => {
    const { status, transactions } = await fetchTransaction();

    status === "success" && setTransaction(transactions);
  };

  const getTransactionByID = async (id) => {
    const { status, transactions } = await getTransactionbyID(id);
    console.log(transactions);
    status === "success" && setSingleTxn(transactions);
  };

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        getTransaction,
        transaction,
        show,
        toggleShow,
        getTransactionByID,
        singletxn,
        disabled,
        setDisabled,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export const useUser = () => useContext(userContext);
