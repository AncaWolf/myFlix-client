import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const currentUser = useSelector((state) => state.user); // Use a different variable name to avoid conflicts
  const dispatch = useDispatch();

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
                {/* <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link> */}
                <Nav.Link onClick={() => dispatch(setUser(null))}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* Use isMainView conditionally if needed
          {isMainView && <MoviesFilter />}  */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// import { Navbar, Container, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { MovieFilter, MoviesFilter } from "../movies-filter/movies-filter";
// import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../../redux/reducers/user";

// export const NavigationBar = ({ user, onLoggedOut }) => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   return (
//     <Navbar bg="light" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           myFlix App
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {!user && (
//               <>
//                 <Nav.Link as={Link} to="/login">
//                   Login
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/signup">
//                   Signup
//                 </Nav.Link>
//               </>
//             )}
//             {user && (
//               <>
//                 <Nav.Link as={Link} to="/">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/profile">
//                   Profile
//                 </Nav.Link>
//                 <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
//                 <Nav.Link onClick={() => dispatch(setUser(null))}>
//                   Logout
//                 </Nav.Link>

//               </>
//             )}
//           </Nav>
//           <Nav>{isMainView && <MoviesFilter />}</Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };
