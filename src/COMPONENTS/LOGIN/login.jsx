import { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
   
   const [Name, setName] = useState('')
   const [isLogged, setIsLogged] = useState(true)

    const Navigate = useNavigate('')


    const Entrar = async () => {
        if (Name.length != 0) {
            localStorage.setItem('Name', Name)
            localStorage.setItem('isLogged', isLogged)
            alert('ENTRADA CONCLUIDA')
            Navigate('/')

            const response = await fetch('http://localhost:3333/userPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: Name
                })
            })


        } else {
            alert('ERRO AO ENTRAR')
        }
    }

    return(
        <div className='LOGIN'>
            <div className='LOGIN_CONTAINER'>
                <h1>Login</h1>
                      <input type="text" value={Name} onChange={e => {
                        setName(e.target.value)
                      }} />
                        <button onClick={Entrar}>Entrar</button>
            </div>
        </div>
    )
}

export default Login