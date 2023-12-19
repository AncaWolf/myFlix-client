import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movie.id);

  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <Link to={`/`}>
        <button
          className="back-button"
          style={{ cursor: "pointer" }}>
          Back to movie list
        </button>
      </Link>
    </div>
  );
};

// defining PropTypes constraints
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};


