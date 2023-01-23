import React from "react";
import {useNavigate} from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
    
    const navigate = useNavigate();

 return (
    <div className="container-fluid">
         <header>
          <nav>
             <ul>
                <li><a onClick={() => navigate('/')}>Home</a></li>
                <li><a onClick={() => navigate('/about')}>About</a></li>
                <li><a onClick={() => navigate('/login')}>Log-In</a></li>
                <li><a onClick={() => navigate('/contactUs')}>Contact-Us</a></li>
            </ul>
            </nav>
         </header>
        </div>
    );
};

export default NavBar;