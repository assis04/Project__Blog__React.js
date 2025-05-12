import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
      }
    }

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='container'>
        <button className='button' onClick={() => window.history.back()}>
          <p> Tela inicial </p>
        </button>
        <div className='card'>
          <div className='card-content'>
            <h1 className='titulo'>{post.title}</h1>
            <p><span>{post.content}</span></p>
          </div>
      </div>   
    </div>
  );
}

export default Post;