import { useContext, useEffect } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, isAuthenticated } =
    useContext(AuthContext); // Access isAuthenticated from context
  const navigate = useNavigate(); // Create a navigate function

  // Use useEffect to redirect after successful registration
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login"); // Redirect to login page (or another page after registration)
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "15%",
          }}
        >
          <Col xs={4} md={3}>
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Loading..." : "Register"}
              </Button>
              {registerError?.message?.msg && (
                <Alert variant="danger">
                  <p>{registerError?.message?.msg}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
