import { useEffect, useState } from "react";

import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import { DefaultLayout } from "./components/Layout/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import { Auth } from "./auth/Auth";
import { useUser } from "./context/UserContext";
import { autoLogin } from "../utilis/user";

function App() {
  const { user, setUser } = useUser();
  useEffect(() => {
    !user?._id && updateUser();
  }, [user?._id]);

  const updateUser = async () => {
    const user = await autoLogin();
    setUser(user);
  };
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/signup" index element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path="/transaction"
            element={
              <Auth>
                <Transaction />
              </Auth>
            }
          />
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
