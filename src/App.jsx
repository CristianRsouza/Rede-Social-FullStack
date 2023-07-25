import './App.css'
import Create from './COMPONENTS/CREATE_POST/create'
import Login from './COMPONENTS/LOGIN/login'
import Relevantes from './COMPONENTS/RELEVANTES/relevantes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='App'>      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Relevantes/>}/>
          <Route path='/Create' element={<Create/>}/>
          <Route path='/Login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
