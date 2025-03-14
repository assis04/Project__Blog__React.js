import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Posts from './Pages/Posts'
import Home from './Pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<Posts />} />
      </Routes>
      {/* <Home /> */}
    </BrowserRouter>
  </StrictMode>,
)
