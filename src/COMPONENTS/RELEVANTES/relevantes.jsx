import './relevantes.css';
import NAVBAR from '../NAVBAR/nav';
import { useEffect, useState, useRef } from 'react';
import { Heart } from 'lucide-react';

const Relevantes = () => {
    const [Posts, setPosts] = useState([]);

    const GetPosts = async () => {  
        const response = await fetch('http://localhost:3333/postagens');
        const responseData = await response.json();
        setPosts(responseData);
    }

    useEffect(() => {
        GetPosts();
    }, []);

    const CurtirRef = useRef();

    const [curtidos, setCurtidos] = useState([]);

    const Curtir = (postId) => {
        setCurtidos((prevCurtidos) => [...prevCurtidos, postId]);
        PostCurtir(postId); // Chama a função PostCurtir enviando o ID do post
    };

    const PostCurtir = async (postId) => {
      
      localStorage.setItem('Curtiu', [curtidos])
      
        try {
            const response = await fetch('http://localhost:3333/PostCurtir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: postId // Envia o ID do post a ser curtido
                })
            });

            if (response.status === 201) {
                console.log('Post curtido com sucesso!');
                GetPosts()
            } else {
                console.error('Erro ao curtir o post:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao curtir o post:', error);
        }
    };

    return (
        <div className='App'>
            <NAVBAR />
            <hr />
            <div className='POSTS'>
                <h1>Pagina Inicial</h1>
                <hr />
                {Posts.map((post) => (
                <li key={post.id}>
                    <div className='POST'>
                        <h1>{post.nome}</h1>
                        <p>{post.texto}</p>
                        <div className='POST_HEART'>
                             <button ref={CurtirRef} onClick={()=> Curtir(post.id)}
                                >
                                <Heart />
                                <i>{post.curtidas}</i>
                            </button>
                        </div>
                    </div>
                </li>
                ))}
            </div>
        </div>
    );
}

export default Relevantes;