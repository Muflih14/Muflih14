import React from "react";
import './NavBar.css'; 

function NavBar() {

 return (
    <div className="container-fluid">
         <header>
          <nav>
             <ul>
                <li><a href='/'>Home</a></li>
                <li><a href = '/about'>About</a></li>
                <li><a href='/login'>Log-In</a></li>
                <li><a href='/contactUs'>Contact-Us</a></li>
            </ul>
            </nav>
         </header>
        </div>
    );
};

export default NavBar;