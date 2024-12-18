import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import Boards from './Board/Boards';
import BoardDetailsPage from './BoardDetails/BoardDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id/details" element={<BoardDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
