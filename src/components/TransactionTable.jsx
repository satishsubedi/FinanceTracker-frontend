import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useUser } from "../context/UserContext";
import { CiCirclePlus } from "react-icons/ci";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import {
  deleteTransaction,
  fetchTransaction,
  getTransactionbyID,
} from "../helpers/axioshelpers";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { CustomModal } from "./CustomModal";
import { TransactionEditForm } from "./TransactionEditForm";
export const TransactionTable = () => {
  const {
    transaction,
    toggleShow,
    getTransaction,

    getTransactionByID,
    singletxn,
  } = useUser();
  const [displaytransaction, setDisplayTransaction] = useState([]);
  const [ischecked, setISChecked] = useState([]);

  //

  useEffect(() => {
    setDisplayTransaction(transaction);
  }, [transaction]);

  const total = displaytransaction.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const handleOnSearch = (e) => {
    const value = e.target.value;
    console.log(value);
    const filterdTransaction = transaction.filter((t) => {
      return t.title.toLowerCase().includes(value.toLowerCase());
    });
    setDisplayTransaction(filterdTransaction);
  };
  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (value === "all") {
      checked
        ? setISChecked(displaytransaction.map((item) => item._id))
        : setISChecked([]);
      return;
    }

    checked
      ? setISChecked([...ischecked, value])
      : setISChecked(ischecked.filter((item) => item != value));
  };
  const handleOnSubmit = async (e) => {
    const data = ischecked;
    const pedingResponse = deleteTransaction(data);
    toast.promise(pedingResponse, { pending: "Please wait ..." });
    const { status, message } = await pedingResponse;
    toast[status](message);
    status === "success" && getTransaction();
  };

  const handleOnEdit = (id) => {
    console.log(id);
    getTransactionByID(id);
    toggleShow(true);
  };

  return (
    <>
      <div className="d-flex m-2 justify-content-between mt-5">
        <div>{displaytransaction.length}transaction(s) found</div>
        <div>
          <Form.Control type="text" onChange={handleOnSearch} />
        </div>
        <div>
          <Button
            onClick={() => toggleShow(true) && console.log(singletxn._id)}
          >
            <CiCirclePlus />
            Add new Transaction
          </Button>
        </div>
      </div>
      <div>
        <Form.Check
          label="Select All"
          value="all"
          // checked={false}
          onChange={handleOnCheck}
          checked={displaytransaction.length === ischecked.length}
        />
      </div>
      <Table hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Txn Date</th>
            <th>Title</th>
            <th>Out</th>
            <th>In</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {displaytransaction.length > 0 &&
            displaytransaction.map((t, i) => {
              return (
                <tr key={i._id}>
                  <td>{i + 1}</td>
                  <td>
                    {
                      <Form.Check
                        label={t.createdAt.slice(0, 10)}
                        value={t._id}
                        onChange={handleOnCheck}
                        checked={ischecked.includes(t._id)}
                      />
                    }
                  </td>
                  <td>{t.title}</td>
                  {t.type === "expense" && (
                    <>
                      <td className="out">{t.amount}</td>
                      <td></td>
                    </>
                  )}
                  {t.type === "income" && (
                    <>
                      <td></td>
                      <td className="in">{t.amount}</td>
                    </>
                  )}
                  <td>
                    <FaEdit value={t._id} onClick={() => handleOnEdit(t._id)} />
                  </td>
                </tr>
              );
            })}

          <tr className="fw-bolder text-end">
            <td colSpan={3}>Total</td>
            {total > 0 && (
              <td className="in" colSpan={2}>
                {total}
              </td>
            )}
            {total < 0 && (
              <td className="out" colSpan={2}>
                {total}
              </td>
            )}
          </tr>
        </tbody>
      </Table>
      {ischecked.length > 0 && (
        <div className="d-grid">
          <Button variant="danger" onClick={handleOnSubmit}>
            {ischecked.length} transaction(s) to be deleted
          </Button>
        </div>
      )}
    </>
  );
};
