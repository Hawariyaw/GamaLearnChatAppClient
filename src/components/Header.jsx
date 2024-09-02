import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
} from "react-bootstrap";

const Header = ({onSignOut, userName}) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Gama Learn</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
           
          </Nav>
          <span>Welcome, {userName}</span>
          <Button onClick={onSignOut} className="mx-4">Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
