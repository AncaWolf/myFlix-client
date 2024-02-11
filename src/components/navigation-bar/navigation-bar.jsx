import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { clearUser } from '../../redux/reducers/user';

export const NavigationBar = () => {
  const currentUser = useSelector((state) => state.user); // Use a different variable name to avoid conflicts
  const dispatch = useDispatch();
  const location = useLocation();
  const isMainView = location.pathname === "/";

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!currentUser.user && ( // Use currentUser.user instead of user to check if the user is logged in
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {currentUser.user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => dispatch(clearUser())}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>{isMainView && <MoviesFilter />}</Nav>
          {/* Use isMainView conditionally if needed */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

