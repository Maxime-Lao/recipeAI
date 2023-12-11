//router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Recette from "./pages/Recette";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recette/:recipe" element={<Recette />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );

}
export default App;
