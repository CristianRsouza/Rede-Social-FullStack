import React, { useEffect, useState } from 'react';
import NAVBAR from '../NAVBAR/nav';
import './profile.css';

const Profile = () => {
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [userName, setUserName] = useState('');

    const GetUser = async () => {
        try {
            const response = await fetch(`http://localhost:3333/${id}`);
            const responseData = await response.json();
            setUser(responseData);
            setUserName(responseData.nome || ''); // Define o nome do usuário, se disponível
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    };

    useEffect(() => {
        GetUser();
    }, []);

    const Salvar = async () => {
        try {
            localStorage.setItem('Name', userName);
            const response = await fetch('http://localhost:3333/NewNome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    NewName: userName,
                    userId: localStorage.getItem('userId'),
                }),
            });

            if (response.status === 200) {
                console.log('Nome atualizado com sucesso!');
                // Atualiza o estado do usuário com o novo nome
                setUser((prevUser) => ({ ...prevUser, nome: userName }));
            } else {
                console.log('Erro ao atualizar o nome.');
            }
        } catch (error) {
            console.error('Erro ao enviar o novo nome do usuário:', error);
        }
    };

    return (
        <div className='App'>
            <NAVBAR />
            {user ? (
                <div className='Profile'>
                    <h1>Perfil</h1>
                    <hr />
                    <p>
                        <strong>Seu Id:</strong> {id}
                    </p>
                    {user.nome ? (
                        <p>
                            <strong>Nome:</strong> {user.nome}
                        </p>
                    ) : (
                        <p>
                            <strong>Nome:</strong> Nome não disponível
                        </p>
                    )}
                    <input
                        type='text'
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                        placeholder='Alterar Nome'
                    />
                    <button onClick={Salvar}>Salvar</button>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Profile;
