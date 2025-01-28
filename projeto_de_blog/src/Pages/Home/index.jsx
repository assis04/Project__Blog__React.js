import './style.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  async function getPosts() {
    try {
      const postFromApi = await api.get('/posts');
      setPosts(postFromApi.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  }

  async function deletePosts(id) {
    await api.delete(`/posts/${id}`);
    getPosts();
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='container'>
      <button className='button_NewPost' onClick={() => navigate('/create-post')}>Criar Novo Post</button>
      {posts.map(post => (
        <div key={post.id} className='card'>
          <div>
            <p>Titulo: <Link className='linkPostId' to={`/posts/${post.id}`}>{post.title}</Link></p>
            <p>Conteudo: <span>{post.content}</span></p>
          </div>
          <button onClick={() => deletePosts(post.id)}>
            <p>Trash</p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
