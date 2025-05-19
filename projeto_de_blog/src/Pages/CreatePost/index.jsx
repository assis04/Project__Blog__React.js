import './style.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import UpdateIcon from '@mui/icons-material/Update';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import api from '../../services/api';

function CreatePost() {
  const [posts, setPosts] = useState([]);
  const [exibe, setExibe] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const inputTitulo = useRef();
  const texteareaConteudo = useRef();

  async function getPosts() {
    try {
      const postFromApi = await api.get('/posts');
      setPosts(postFromApi.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  }
  async function handleSubmit(e = null) {
    if (e != null) e.preventDefault();
    
    if (editingId) {
      await updatePost();
    } else {
      await createPost();
    }
  }

  async function createPost() {
    try {
      await api.post('/posts', {
        title: inputTitulo.current.value,
        content: texteareaConteudo.current.value
      });
      clearForm();
      getPosts();
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  }

  async function updatePost() {
    try {
      const currentPost = posts.find(post => post.id === editingId);
      await api.put(`/posts/${editingId}`, {
        ...currentPost,
        title: inputTitulo.current.value,
        content: texteareaConteudo.current.value
      });
      setEditingId(null);
      clearForm();
      getPosts();
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
    }
  }

  

  function cancelEditing() {
    setEditingId(null);
    clearForm();
  }

  function clearForm() {
    inputTitulo.current.value = '';
    texteareaConteudo.current.value = '';
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='container'>
    <div className='navbar'>
        <Link to="/" className='button btn-purple'>
          <HomeOutlinedIcon />
          <span>Home</span>
        </Link>
        <button className={`button btn-purple {exibe ? '' : 'exibir'}`} onClick={() => setExibe(true)}>
          <PostAddOutlinedIcon />
          <span>Criar Post</span>
        </button>
      </div>
      <form className={exibe ? '' : 'exibir'} onSubmit={(e) => handleSubmit(e)}>
        <h1>{editingId ? 'Editar post' : 'Crie seu post'}</h1>
        <input className='cx_titulo_form' placeholder='Título' name='titulo' type='text' ref={inputTitulo} />
        <textarea className='cx_conteudo_form' placeholder='Conteúdo' name='conteudo' type='text' ref={texteareaConteudo} />
        <div className="form-buttons">
          <button className='button btn-purple' type='button' onClick={handleSubmit}>
            {editingId ? <UpdateIcon /> : <ControlPointIcon />}
            <span> Atualizar </span>
          </button>
          {editingId && (
            <button className='button btn-purple' type='button' onClick={cancelEditing}>
              <CancelOutlinedIcon />
              <span>Cancelar</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatePost;