import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (searchQuary: string) => {
    setIsLoading(true);
    setMoviesList([]);
    setIsError(false);

    try {
      const response = await fetchMovies(searchQuary);
      if (response.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMoviesList(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <MovieGrid onSelect={handleSelect} movies={moviesList} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </>
  );
}

export default App;
