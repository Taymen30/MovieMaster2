import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import HomeButton from "./HomeButton";

export default function SearchBar({
  setMovieListParam,
  setTvListParam,
  currentMediaType,
}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setQuery(currentQuery);
    console.log(currentMediaType);
  }, [searchParams]);

  useEffect(() => {
    if (show) {
      const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
          setShow(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [show]);

  function handleInput(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ query });
    navigate(`/search?query=${query}`);
  }

  function handleShowSearch() {
    setShow(true);
  }

  function handleSearchType(e) {
    e.preventDefault();
    currentMediaType === "movie"
      ? setMovieListParam(e.target.value)
      : setTvListParam(e.target.value);
  }

  if (!show) {
    return (
      <div className="flex fixed gap-2 right-1 top-2 z-20">
        <HomeButton />
        {location.pathname !== "/bookmarks" &&
          ((localStorage.getItem("bookmarked-tv") &&
            JSON.parse(localStorage.getItem("bookmarked-tv")).length > 0) ||
          (localStorage.getItem("bookmarked-movie") &&
            JSON.parse(localStorage.getItem("bookmarked-movie")).length > 0) ? (
            <Link to="/bookmarks">
              <img
                src="/bookmarks-outline.417x512.png"
                alt=""
                className="h-[40px] filter invert hover:cursor-pointer hover:opacity-70 transition-opacity duration-300"
              />
            </Link>
          ) : null)}

        <img
          onClick={handleShowSearch}
          src="/search.512x512.png"
          alt=""
          className="w-[40px] h-[40px] hover:cursor-pointer hover:opacity-70 transition-opacity duration-300"
        />
      </div>
    );
  }

  return (
    <div className="px-2 flex fixed gap-1 right-1 top-2 z-50">
      <HomeButton />
      {location.pathname !== "/bookmarks" &&
        ((localStorage.getItem("bookmarked-tv") &&
          JSON.parse(localStorage.getItem("bookmarked-tv")).length > 0) ||
        (localStorage.getItem("bookmarked-movie") &&
          JSON.parse(localStorage.getItem("bookmarked-movie")).length > 0) ? (
          <Link to="/bookmarks">
            <img
              src="/bookmarks-outline.417x512.png"
              alt=""
              className="h-[40px] mr-3 opacity-85 filter invert hover:cursor-pointer hover:opacity-70 transition-opacity duration-300"
            />
          </Link>
        ) : null)}

      {location.pathname === "/" ? (
        <select
          onChange={(e) => handleSearchType(e)}
          className="bg-transparent border border-white text-white rounded focus:outline-white mr-3 ml-[-10px] hover:cursor-pointer"
        >
          {currentMediaType === "movie" ? (
            <>
              <option value="now_playing">Now Playing</option>
              <option value="popular">Popular</option>
              <option value="top_rated">Top Rated</option>
              <option value="upcoming">Upcoming</option>
            </>
          ) : (
            <>
              <option value="popular">Popular</option>
              <option value="top_rated">Top Rated</option>
              <option value="on_the_air">On The Air</option>
              <option value="airing_today">Airing Today</option>
            </>
          )}
        </select>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit} className="ml-3 flex justify-center">
        <input
          value={query}
          onChange={handleInput}
          type="text"
          className="bg-transparent text-white border border-white rounded mr-1 ml-[-10px]"
        />
        <button className="text-white px-1 border border-white rounded hover:opacity-70 transition-opacity duration-300">
          Search
        </button>
      </form>
    </div>
  );
}
