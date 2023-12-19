import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img className="w-100" variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// export const MovieCard = ({ movie, onMovieClick }) => {
//   return (
//     <Card className="h-100">
//       <Card.Img className="w-100" variant="top" src={movie.ImagePath} />
//       <Card.Body>
//         <Card.Title>{movie.Title}</Card.Title>
//         <Button onClick={() => onMovieClick(movie)} variant="link">
//           View
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// defining PropTypes constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired,
};
