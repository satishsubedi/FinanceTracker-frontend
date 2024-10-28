import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const Auth = ({ children }) => {
  const location = useLocation();
  // console.log(location);

  const { user } = useUser();
  return user ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
