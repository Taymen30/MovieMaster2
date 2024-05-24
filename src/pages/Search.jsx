import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MediaGrid from "../components/MediaGrid";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [queryResults, setQueryResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setQueryResults([]);
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    let savedMediaType = localStorage.getItem("media-type");
    const mediaType = savedMediaType === "movie" ? "movie" : "tv";
    const url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${api_key}&query=${query}&page=${currentPage}`;

    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filteredResults = data.results.filter(
          (movie) => movie.poster_path
        );
        setQueryResults((prevResults) => [...prevResults, ...filteredResults]);
        setLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 200;
      const scrollY = window.scrollY || window.pageYOffset;

      if (
        window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - scrollThreshold &&
        !loading
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      <header className="flex h-14 items-center">
        <h1 className="text-5xl">Search</h1>
        <p className="pl-2">{query}</p>
        <SearchBar />
      </header>
      <MediaGrid array={queryResults} />
    </>
  );
}
