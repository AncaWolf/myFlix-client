import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({ user, setUser, movies, removeFav, addFav }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(user.Birthdate);
  const navigate = useNavigate();
  const favouriteMovieList = movies.filter(movie => user.FavouriteMovies.includes(movie._id));
  const token = localStorage.getItem("token");

  const handleUpdate = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      Username: username,
      Email: email,
      Birthdate: birthdate,
      Password: user.Password,
    }

    fetch(`https://awolf-movies-app.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(async (response) => {
      console.log(response)
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Update was succesful");
      } else {
        alert("Failed to update!")
      }
    }).catch(error => {
      console.error("Error: ", error);
    });
  };


  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>Username:{user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className="mt-5">
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Birthdate:</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" onClick={handleUpdate} className="mt-3 me-2">Update</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
        <Row className="justify-content-center">
          {
            favouriteMovieList?.length !== 0 ?
              favouriteMovieList?.map((movie) => (
                <Col sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img" key={movie._id}>
                  <MovieCard
                    movie={movie}
                    user={user}
                    token={token}
                    setUser={setUser}
                  // removeFav={removeFav}
                  // addFav={addFav}
                  // isFavourite={user.FavouriteMovies.includes(movie._id)}
                  />
                </Col>
              ))
              : <Col>
                <p>There are no favourites Movies</p>
              </Col>
          }
        </Row>
      </Row>
    </Container>
  );
};



