//router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Recette from "./pages/Recette";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recette/:recipe" element={<Recette />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );

}
export default App;
