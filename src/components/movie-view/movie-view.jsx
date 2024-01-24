import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import "./movie-view.scss";


export const MovieView = ({ movies }) => {

  const { movieId } = useParams()
  const movie = movies.find((movie) => movie._id === movieId);

  return (
    <>
      <Row>

        <Col>
          <div>
            <span>{movie.Title}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <Col>
            <img src={movie.ImagePath} />
          </Col>
          <span></span>
          <span></span>
          <Link to={`/`}>
            <button
              className="back-button"
              style={{ cursor: "pointer" }}>
              Back to movie list
            </button>
          </Link>
        </Col>
      </Row>
    </>
  );
};


