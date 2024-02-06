import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "./login-view.scss";
import { useDispatch } from 'react-redux';
import { setUser } from "../../redux/reducers/user";




export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    fetch("https://awolf-movies-app.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log("login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          dispatch(setUser({ user: data.user, token: data.token }));
          // dispatchEvent(setUser({ user: data.user, token: data.token }));
        } else {
          alert("No such user");
        }
      })
  }

  return (
    <Container className="loginView">
      <h2>Login Page</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="formBox">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="formBox">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button id="loginBtn" variant="primary" type="submit">
          <span></span>
          <span></span>
          Login
        </Button>
      </Form>
    </Container>
  );
};


