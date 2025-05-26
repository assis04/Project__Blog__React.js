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

  useEffect(() => {
    security();
    getPosts();
  }, []);

  function security(){
    const logado = window.localStorage.getItem("Logado");
    if(logado !== "true"){
      alert("Você não está logado!");
      window.location.href = "/login";
    }
  }

  function logout(){
    window.localStorage.removeItem("Logado");
    window.location.href = "/";
  }
  async function getPosts() {
    try {
      const postFromApi = await api.get('/posts');
      let posts = postFromApi.data

      // const ret = "...";
      // for (let i = 0; i < posts.length; i++) {
      //   posts[i]['contentResumido'] = posts[i].content.slice(0, 20);
      //   posts[i].contentResumido = `${posts[i].contentResumido} ${ret}`
      // }

      const ret = "...";
      const caracteres = 100;
      posts.map((p) => {
        let string = p.content.slice(0, caracteres);
        string = `${string} ${ret}`;
        p['contentResumido'] = string;
      })

      setPosts(posts);
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
        <button className='button btn-purple' onClick={logout}>
          <span> Fazer Logout </span>
        </button>
      </div>

      <form className={exibe ? '' : 'exibir'} onSubmit={(e) => handleSubmit(e)}>
        <h1>{editingId ? 'Editar post' : 'Crie seu post'}</h1>
        <input className='cx_titulo_form' placeholder='Título' name='titulo' type='text' ref={inputTitulo} />
        <textarea className='cx_conteudo_form' placeholder='Conteúdo' name='conteudo' type='text' ref={texteareaConteudo} />
        <div className="form-buttons">
          <button className='button btn-purple' type='button' onClick={handleSubmit}>
            {editingId ? <UpdateIcon /> : <ControlPointIcon />}
            {editingId ? <span>Atualizar</span> : <span>Postar</span>}
          </button>
          {editingId && (
            <button className='button btn-purple' type='button' onClick={cancelEditing}>
              <CancelOutlinedIcon />
              <span>Cancelar</span>
            </button>
          )}
        </div>
      </form>


      {posts.map(post => (
        <div key={post.id} className='card'>
          <div>
            <Link className='link' to={"/posts/" + post.id}>
              <p className='titulo'>{post.title}</p>
              <p> <span>{post.contentResumido}</span></p>
            </Link>
          </div>
          <div className='right-column-button-vertical'>
            <button className='miniButton btn-purple'
              onClick={() => startEditing(post)}>
              <EditTwoToneIcon />
            </button>
            <button className='miniButton btn-purple'
              onClick={() => deletePosts(post.id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;