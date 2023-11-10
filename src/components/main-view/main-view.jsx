import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "3000 Years of Longing",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8uXqrnNB1la90uMzUKxxnabuDNZNCSMFQ6aBbc3TNOly3LEMY",
      director: "George Miller",
      genre: "drama",
      description: "While attending a conference in Istanbul, dr. Alithea Binnie happens to encounter a djinn who offers her three wishes in exchange for his freedom. This presents two problems: first, she doubts that he's real, and second, because she's a scholar of story and mythology, she knows all the cautionary tales of wishes gone wrong. The djinn pleads his case by telling her fantastical stories of his past. Eventually, she's beguiled and makes a wish that surprises them both."
    },
    {
      id: 2,
      title: "House of Flying Daggers",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRiaJpaCSjZbBYcKPw4U07VES7KbATmH83i7cPmFlvLRiUPWDmc",
      director: "Yi-Mou Zhang",
      genre: "drama",
      description: "A police captain breaks a dancer of a rebel group out of prison to help her rejoin her fellow members. He gains her trust only to use her to lead him to the new leader of the organisation."
    },
    {
      id: 3,
      title: "Stardust",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1Lp5k23Aon4rPVuoD1uGYAu-4jHfy_kepN54mv2NaphJJvD1s",
      director: "Matthew Vaughn",
      genre: "adventure",
      description: "Tristan promises Victoria to get a star from the magical kingdom of Stormhold that exists beyond the Wall. Trying to keep his promise, Tristan ends up having an adventure that changes his life. He learns that the star he was searching for is, in fact, a woman, and they find themselves having an adventure together, which leads them to falling in love."
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
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
  );
};
