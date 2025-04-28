import './style.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const postFromApi = await api.get('/posts');
      setPosts(postFromApi.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  }


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='container'>
    <Link to="/Admin" className='button'>
      Admin
    </Link>
      {posts.map(post => (
        <div key={post.id} className='card'>
          <div>
            <Link className='link' to={"/posts/" + post.id}>
              <p className='titulo'>{post.title}</p>
              <p> <span>{post.content}</span></p>
            </Link>
          </div>
          <div className='buttons'>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;