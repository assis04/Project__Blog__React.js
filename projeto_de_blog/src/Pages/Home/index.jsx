import './style.css';
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

function Home() {
  const [posts, setPosts] = useState([])

  const inputTitulo = useRef()
  const texteareaConteudo = useRef()

  async function getPosts() {
    try {
      const postFromApi = await api.get('/posts')
      setPosts(postFromApi.data)
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    }
  }

  async function createPosts()  {
      await api.post('/posts', {
        title: inputTitulo.current.value,
        content: texteareaConteudo.current.value
      })
      getPosts()
  }

  async function deletePosts(id) {
    await api.delete(`/posts/${id}`)
    getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Crie seu post</h1>
        <input placeholder='Título' name='titulo' type='text' ref={inputTitulo}/>
        <textarea placeholder='Conteúdo' name='conteudo' type='text' ref={texteareaConteudo}/>
        <button type='buttonadw' onClick={createPosts}>Postar</button>
      </form>


      {posts.map(post => (
        <div key={post.id} className='card'>
          <div>
            <p>Titulo: <span>{post.title}</span>  </p>
            <p>Conteudo: <span>{post.content}</span> </p>
          </div>
          <Link to={"/posts/" + post.id }>
            <p>View</p>
          </Link>
          <button onClick={() => deletePosts(post.id)}>
            <p>Trash</p>
          </button>
        </div>

      ))}

    </div>


  )
}

export default Home
