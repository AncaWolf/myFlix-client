import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./movie-card.scss";

export const MovieCard = ({ movie, token, setUser, user }) => {
  console.log("Movie from movie card", movie);

  const [isFavourite, setIsFavourite] = useState(
    false
  );

  useEffect(() => {
    if (user.FavouriteMovies && user.FavouriteMovies.includes(movie._id)) {
      setIsFavourite(true);
    }
  }, [user]);

  const addFavouriteMovie = () => {
    fetch(
      `https://awolf-movies-app.onrender.com/users/${user.Username}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add movie to favourites");
        }
      })
      .then((user) => {
        if (user) {
          alert("Movie successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavourite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavouriteMovie = () => {
    fetch(
      `https://awolf-movies-app.onrender.com/users/${user.Username}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Operation failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("Movie was successfully deleted from favourites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavourite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="mc-box">
      <Card.Img className="movie-img" variant="top" src={movie.ImagePath} />
      <Card.Body className="mc-bg">
        <Card.Title class="mc-text">{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">See movie details</Button>
        </Link>
        <Card.Body className="favorite-btns">
          {!isFavourite ? (
            <Button className="fav-btn" onClick={addFavouriteMovie}>+</Button>
          ) : (
            <Button className="fav-btn" onClick={removeFavouriteMovie}>-</Button>
          )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

// defining PropTypes constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
