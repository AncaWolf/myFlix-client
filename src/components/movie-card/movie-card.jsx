import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavourite, setIsFavourite] = useState(
    false
  );

  useEffect(() => {
    if (user.FavouriteMovies && user.FavouriteMovies.includes(movie.id)) {
      setIsFavourite(true);
    }
  }, [user]);

  const addFavouriteMovie = () => {
    fetch(
      `https://awolf-movies-app.onrender.com/users/${user.username}/movies/${movie.id}`,
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
      `https://awolf-movies-app.onrender.com/users/${user.username}/movies/${movie.id}`,
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
          alert("Movie was successfully deleted from favorites");
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
    <Card className="h-100">
      <Card.Img className="w-100" variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
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
