import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { useUser } from "../../context/UserContext";
export const Header = () => {
  const { user, setUser } = useUser();
  const [showmenu, setShowMenu] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("jwttoken");
    setUser({});
    setShowMenu(false);
  };
  return (
    <div>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" expanded={showmenu}>
        <Container>
          <Navbar.Brand href="#home">Finace Tracker</Navbar.Brand>
          {user?.name && <div>Welcome {user.name} </div>}

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setShowMenu(true)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user?._id ? (
                <>
                  <Nav.Link
                    as={Link}
                    onClick={() => setShowMenu(false)}
                    className="nav-link "
                    to="/signup"
                  >
                    <IoCreate />
                    SignUp
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className="nav-link"
                    to="/"
                    onClick={() => setShowMenu(true)}
                  >
                    <MdLogin /> Login
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    onClick={handleLogout}
                    className="nav-link"
                    to="/"
                  >
                    <IoMdExit /> Logout
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className="nav-link"
                    to="/dashboard"
                    onClick={() => setShowMenu(false)}
                  >
                    <MdSpaceDashboard /> Dashboard
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className="nav-link"
                    to="/transaction"
                    onClick={() => setShowMenu(false)}
                  >
                    <AiOutlineTransaction /> Transaction
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
