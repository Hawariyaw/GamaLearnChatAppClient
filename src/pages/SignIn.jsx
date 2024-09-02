import React from "react";
import { Container, Form, Card, Button, Row } from "react-bootstrap";

// api
import { signIn } from "../api/user";

const SignIn = ({ onSignIn, redirectToSignUp }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authenticatedUser = await signIn({
      userName: e.target.elements.userName.value,
      password: e.target.elements.password.value,
    });
    if (authenticatedUser) {
      return onSignIn(authenticatedUser);
    }

    alert("Incorrect username or password");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ background: "#eee", minHeight: "100vh" }}
    >
      <div className="w-50">
        <Card className="p-4">
          <Card.Title className="text-center">Sign In</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="userName"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 my-4 d-flex justify-content-between">
              <div className="d-flex align-items-end">
                <Form.Label>Don't have an account?</Form.Label>
                <Button variant="link" type="button" onClick={redirectToSignUp}>
                  Sign Up
                </Button>
              </div>
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default SignIn;
