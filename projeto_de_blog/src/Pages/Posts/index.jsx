import './style.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
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
        <Link to={"/"} className='button btn-purple'>
          <HomeOutlinedIcon />
          <span>Home</span>
        </Link>
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