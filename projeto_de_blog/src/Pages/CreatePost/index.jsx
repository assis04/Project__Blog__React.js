import './style.css';
import { useRef } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const inputTitulo = useRef();
  const texteareaConteudo = useRef();
  const navigate = useNavigate();

  async function createPosts() {
    await api.post('/posts', {
      title: inputTitulo.current.value,
      content: texteareaConteudo.current.value,
    });
    navigate('/');
  }

  return (
    <div className='container'>
      <form>
        <h1>Crie seu post</h1>
        <input placeholder='Título' name='titulo' type='text' ref={inputTitulo} />
        <textarea placeholder='Conteúdo' name='conteudo' type='text' ref={texteareaConteudo} />
        <button type='button' onClick={createPosts}>Postar</button>
      </form>
    </div>
  );
}

export default CreatePost;