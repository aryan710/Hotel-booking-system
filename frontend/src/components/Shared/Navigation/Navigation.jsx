import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logoutApi } from "../../../http";
import { clearAuth, setAuth } from "../../../stores/authSlice";
import { openToaster } from "../../../stores/toasterSlice";
import { CircularProgress } from "@mui/material";
const Navigation = () => {
  const [isLogingOut, setIsLogingOut] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const role = useSelector((state) => state.auth.role);
  console.log(role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signin");
  };
  const styles = {
    spinner: {
      width: 20,
      height: 20,
      color: "#fff",
      marginTop: 2,
    },
    link: {
      color: "#fff",
      textDecoration: "none",
    },
  };
  const handleLogout = async () => {
    setIsLogingOut(true);
    try {
      await logoutApi();
      dispatch(clearAuth());
      setIsLogingOut(false);
      dispatch(
        openToaster({
          message: `logged out`,
          error: false,
          success: true,
        })
      );
    } catch (error) {
      setIsLogingOut(false);
      dispatch(
        openToaster({
          message: error.message,
          error: true,
          success: false,
        })
      );
    }
  };
  return (
    <Navbar expand="lg" style={{ background: "#56B2FF" }}>
      <Container fluid style={{ background: "#56B2FF" }}>
        <Navbar.Brand style={{ color: "#fff", fontWeight: "bold" }}>
          <Link
            to={"/"}
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Hotelin.com
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {role === "hotel" ? (
              <>
                <Nav.Link>
                  <Link to={"hotel/add-room"} style={styles.link}>Add Room</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/hotel/edit-room"} style={styles.link}>Edit Room</Link>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/hotels" style={{ color: "#fff" }}>
                Hotels
              </Nav.Link>
            )}
            {role === "customer" && (
              <Nav.Link href="/my-bookings" style={{ color: "#fff" }}>
                Bookings
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            {isLogingOut && isAuth ? (
              <Button>
                <CircularProgress color="secondary" style={styles.spinner} />
              </Button>
            ) : isAuth && !isLogingOut ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={handleClick}>Login</Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
