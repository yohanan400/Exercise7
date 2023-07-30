import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./components/Login/Login"
import Articles from "./components/articles/Articles"
import Article from "./components/articles/Article"
import Contact from "./components/Contact/Contact"
import Forum from "./components/Forum/Clusters/Clusters"
import Info from "./components/Info/Info"
import Register from "./components/Register/Register"
import Summaries from "./components/Summaries/Summaries"
import Categories from './components/Summaries/Categories';
import Videos from "./components/Videos/Categories"
import NavBar from "./components/NavBar/NavBar"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import { createContext, useState } from 'react';
import Posts from './components/Forum/Posts/Posts';
import Post from './components/Forum/Posts/Post';

export const userContext = createContext();

function App() {

  const [userData, setuserData] = useState();

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ''; // Legacy method for cross browser support
    }
    return ''; // Legacy method for cross browser support
  };
  

  return (
    <userContext.Provider value={userData}>
      <BrowserRouter>
        <NavBar userData={userData} setuserData={setuserData} />
        <Routes>
          <Route path="/" element={<Login setuserData={setuserData} />} />
          <Route path="/login" element={<Login setuserData={setuserData} />} />
          <Route path="/articles" element={<Articles />} />
          <Route path='/articles/:title' element={<Article />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:cluster" element={<Posts />} />
          <Route path="/forum/:cluster/:postId" element={<Post />} />
          <Route path="/info" element={<Info userDetails={userData} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/summaries" element={<Categories />} />
          <Route path="/summaries/:category" element={<Summaries />} />
          <Route path="/videos" element={<Videos />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
