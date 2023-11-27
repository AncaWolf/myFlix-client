import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // fetch data from Api
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://awolf-movies-app.onrender.com", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: {
              genreName: movie.Genre.genreName,
              Description: movie.Genre.Description,
            },
            director: {
              directorName: movie.Director.directorName,
              bio: movie.Director.Bio,
              birthyear: movie.birthyear,
            },
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </>
  );
};



{/* <button onClick={() => { setUser(null); setToken(null); }}>Logout</button> */ }
