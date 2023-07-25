import './create.css'
import NAVBAR from '../NAVBAR/nav'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Create = () => {

    const Navigate = useNavigate()

    const [Text, setText] = useState('')


    const Publicar = async () => {
      
    const log = localStorage.getItem('isLogged')
     if (log === undefined || log === null) {
        Navigate('/Login');
    }
     else {
            if (Text.length != 0) {
                Navigate('/')
                const response = await fetch('http://localhost:3333/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Curtidas: 0,
                        Name: localStorage.getItem('Name'),
                        Text: Text
    
                    })
                })
    
    
            } else {
                alert('ERRO AO ENTRAR')
            }
        }
    }
    
    return(
        <div className='App'>
            <NAVBAR />
              <hr />
                <div className='Create'>
                    <h1>Criar Post</h1>
                       <hr />
                            <div>
                                <textarea onChange={e => {
                                    setText(e.target.value)
                                }} value={Text}>
                                    teste
                                </textarea>
                                <p>max 80/{Text.length}</p>
                                    <button onClick={Publicar}>Publicar</button>
                            </div>
                </div>
        </div>
    )
}

export default Create