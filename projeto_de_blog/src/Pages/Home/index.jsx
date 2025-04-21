import './style.css';
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

function Home() {
  const [posts, setPosts] = useState([]);
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

  async function handleSubmit() {
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
    setEditingId(post.id);
    inputTitulo.current.value = post.title;
    texteareaConteudo.current.value = post.content;
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
      <form>
        <h1>{editingId ? 'Editar post' : 'Crie seu post'}</h1>
        <input placeholder='Título' name='titulo' type='text' ref={inputTitulo}/>
        <textarea placeholder='Conteúdo' name='conteudo' type='text' ref={texteareaConteudo}/>
        <div className="form-buttons">
          <button type='button' onClick={handleSubmit}>
            {editingId ? 'Atualizar' : 'Postar'}
          </button>
          {editingId && (
            <button type='button' onClick={cancelEditing}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {posts.map(post => (
        <div key={post.id} className='card'>
          <div>
            <p>Titulo: <span>{post.title}</span></p>
            <p>Conteudo: <span>{post.content}</span></p>
          </div>
          <div className="card-actions">
            <Link to={"/posts/" + post.id}>
              <p>View</p>
            </Link>
            <button onClick={() => startEditing(post)}>
              <p>Editar</p>
            </button>
            <button onClick={() => deletePosts(post.id)}>
              <p>Trash</p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;