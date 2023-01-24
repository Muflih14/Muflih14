import NavBar from "../NavBar/NavBar";
import {useNavigate} from 'react-router-dom';
import Connect from "./connect";
import './login.css';

function LogIn() {

    const navigate = useNavigate();

 return (
    <>
    <div>
        <NavBar />
    </div>
    <div className="content">
       <h2>Log IN</h2>

    <div className='buttons'>
       <button className="button"><a onClick={() => navigate('/projects')}>CONNECT TO WALLET</a></button>
       <Connect />
       <button className="button"><a href="https://bitcoin.org/en/choose-your-wallet">CREATE A WALLET</a></button>
    </div>

    </div>
    </>
    );
 }
export default LogIn;