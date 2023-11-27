import React from "react";
import { useState, useEffect } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      access: username,
      secret: password,
    };
    fetch("https://awolf-movies-app.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log("login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
