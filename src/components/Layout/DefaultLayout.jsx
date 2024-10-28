import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div>
      {/* navbar */}
      <Header />
      {/* actual content */}
      <div className="main">
        <Outlet />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};
