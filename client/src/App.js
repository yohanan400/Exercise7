import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./components/Login/Login"
import Articles from "./components/articles/Articles"
import Contact from "./components/Contact/Contact"
import Forum from "./components/Forum/Clusters/Clusters"
import Info from "./components/Info/Info"
import Register from "./components/Register/Register"
import Summaries from "./components/Summaries/Categories"
import Videos from "./components/Videos/Categories"
import NavBar from "./components/NavBar/NavBar"


function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/info" element={<Info />} />
        <Route path="/register" element={<Register />} />
        <Route path="/summaries" element={<Summaries />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
