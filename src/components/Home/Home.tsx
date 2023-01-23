import React from "react";
import {useNavigate} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './home.css';
 
function Home() {
    
    const navigate = useNavigate();

 return (
    <>
   <div className="container-fluid">
                {/* background */}
          <div className="background">
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
          </div>

          {/* header */}
          <header>
          <NavBar />

            <div className="logo"><span>S</span></div>

            <section className="header-content">
              <h1>Welcome</h1>
              <p> Welcome to STEPIFY.<br/>
                  Track your Project from start to finish on our Decentralized Platform</p>
              <button onClick={() => navigate('/about')}>More...</button>
              <button onClick={() => navigate('/login')}>Log In </button>
            </section>
          </header>
      </div>
</>
    
    );
};

export default Home;