import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{ height: "40px", objectFit: "contain" }}
            />
          </Link>

          {/* Hypertext Link */}
          <Link
            to="/"
            style={{ color: "white", marginLeft: "10px", fontSize: "20px" }}
            className="link-light text-decoration-none"
          >
            Home
          </Link>
        </h2>
        {user && (
          <span className="text-info">Thanks for logging in {user?.name}!</span>
        )}
        <Nav>
          <Stack direction="horizontal" gap={4}>
            {user && (
              <>
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              </>
            )}

            {!user && (
              <>
                {" "}
                <Link
                  to="/login"
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                  className="link-light text-decoration-none"
                >
                  Home
                </Link>
                <Link
                  to="/register"
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
