import React, { useEffect } from 'react';
import './App.css';
import Create from './COMPONENTS/CREATE_POST/create';
import Login from './COMPONENTS/LOGIN/login';
import Profile from './COMPONENTS/PROFILE/profile';
import Relevantes from './COMPONENTS/RELEVANTES/relevantes';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const isLogged = localStorage.getItem('isLogged');
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged === undefined || isLogged === null) {
      navigate('/Login');
    }
  }, [isLogged, navigate]);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Relevantes />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Login' element={<Login />} />
        <Route path={`/${id}`} element={<Profile />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
