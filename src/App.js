import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Genre from "./pages/Genre";
import Favourites from "./pages/Favourites";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/movie/:id" element={<Movie />} />
            <Route exact path="/search/:query" element={<Search />} />
            <Route exact path="/genre/:genre" element={<Genre />} />
            <Route exact path="/favourites" element={<Favourites />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
