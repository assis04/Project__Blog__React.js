import './style.css';
import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

function CreatePost() {
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

  async function handleSubmit(e = null) {
    if (e != null) e.preventDefault();
    
    if (editingId) {
      await updatePost();
    } else {
      await createPost();
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
      <form onSubmit = {(e) => handleSubmit(e)}>
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
    </div>
  );
}

export default CreatePost;