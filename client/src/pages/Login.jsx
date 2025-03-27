import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading, isAuthenticated } =
    useContext(AuthContext); // Add isAuthenticated to context
  const navigate = useNavigate(); // Create a navigate function

  // Use useEffect to redirect when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to dashboard (or any page you want) after login
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "15%",
          }}
        >
          <Col xs={4} md={3}>
            <Stack gap={3}>
              <h2>Login</h2>

              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Loading..." : "Login"}
              </Button>

              {loginError?.msg && (
                <Alert variant="danger">
                  <p>{loginError?.msg}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
