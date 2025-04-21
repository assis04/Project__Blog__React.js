import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home';
import Post from './Pages/Posts';
import CreatePost from './Pages/CreatePost';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  </StrictMode>,
);