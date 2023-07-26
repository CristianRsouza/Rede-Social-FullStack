import { NavLink } from 'react-router-dom'
import './nav.css'

const NAVBAR = () => {
    
    const id = localStorage.getItem('userId')
    
    return(
        <div className="NAVBAR">
            <div className='NAVBAR_TOP'>
                 <NavLink to={'/'} className='NAVBAR_ON NAVBAR_P'>Pagina Inicial</NavLink>
            </div>
            <hr />
            <div className='NAVBAR_BOTTOM'>
                  <NavLink className='NAVBAR_P' to={'/Create'}>Criar Post</NavLink>
                  <NavLink className='NAVBAR_P' to={`/${id}`}>Ver Perfil</NavLink>

            </div>
        </div>
    )
}

export default NAVBAR