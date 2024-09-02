import React from "react";
import { Container, Card } from "react-bootstrap";

// api
import { signUp } from "../api/user";
import { Form, Button } from "react-bootstrap";

const SignUp = ({ onSignUp, redirectToSignIn }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    if (
      await signUp({
        firstName: e.target.elements.firstName.value,
        lastName: e.target.elements.lastName.value,
        userName: e.target.elements.userName.value,
        password,
      })
    ) {
      alert("Account created successfully");
      return onSignUp();
    }

    alert("Something went wrong :(");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ background: "#eee", minHeight: "100vh" }}
    >
      <div className="w-50">
        <Card className="p-4">
          <Card.Title className="text-center">Sign Up</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                required
              />
            </Form.Group>

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
                placeholder="Password"
                name="password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
              />
              <Form.Text className="text-muted">Passwords must match</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 my-4 d-flex justify-content-between">
              <div className="d-flex align-items-end">
              <Form.Label>Already have an account?</Form.Label>
                <Button variant="link" type="button" onClick={redirectToSignIn}>
                  Sign In
                </Button>
              </div>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default SignUp;
