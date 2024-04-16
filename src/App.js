import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";


function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/movie/:id' element={<Movie />} />
              <Route exact path='/search/:query' element={<Search />} />
              <Route exact path='/' element={<Home />} />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
