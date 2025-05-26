import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/index.css';
import Admin from './Pages/Admin';
import Post from './Pages/Posts';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Login from './Pages/Login';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </StrictMode>,
);