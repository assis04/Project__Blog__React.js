import './style.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import UpdateIcon from '@mui/icons-material/Update';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import api from '../../services/api';

function Admin() {
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
    setExibe(false);
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

  async function deletePosts(id) {
    await api.delete(`/posts/${id}`);
    getPosts();
  }

  function startEditing(post) {
    setExibe(true);
    setEditingId(post.id);
    inputTitulo.current.value = post.title;
    texteareaConteudo.current.value = post.content;
  }

  function cancelEditing() {
    setExibe(false)
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
        <Link to="/" className='button'>
          <HomeOutlinedIcon />
        </Link>
        <button className={`button {exibe ? '' : 'exibir'}`} onClick={() => setExibe(true)}>
          <PostAddOutlinedIcon from  />
        </button>

      </div>

      <form className={exibe ? '' : 'exibir'} onSubmit={(e) => handleSubmit(e)}>
        <h1>{editingId ? 'Editar post' : 'Crie seu post'}</h1>
        <input placeholder='Título' name='titulo' type='text' ref={inputTitulo} />
        <textarea placeholder='Conteúdo' name='conteudo' type='text' ref={texteareaConteudo} />
        <div className="form-buttons">
          <button className='button' type='button' onClick={handleSubmit}>
            {editingId ? <UpdateIcon /> : <ControlPointIcon />}
          </button>
          {editingId && (
            <button className='button' type='button' onClick={cancelEditing}>
              <CancelOutlinedIcon />
            </button>
          )}
        </div>
      </form>


      {posts.map(post => (
        <div key={post.id} className='card'>
          <div>
            <Link className='link' to={"/posts/" + post.id}>
              <p className='titulo'>{post.title}</p>
              <p> <span>{post.content}</span></p>
            </Link>
          </div>
          <div className='buttons'>
            <button className='colorWhite' onClick={() => startEditing(post)}>
              <EditTwoToneIcon />
            </button>
            <button onClick={() => deletePosts(post.id)}>
              <DeleteIcon className='colorWhite' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;