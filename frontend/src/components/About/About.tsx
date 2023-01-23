import NavBar from "../NavBar/NavBar";
import './about.css';
    

function About() {

 return (
    <>
    <div>
        <NavBar />
    </div>
    <div className="content">
        <h2>About Us</h2>

        <p> STEPIFY is a Decentralized Web Application for<br/>
            properly monitoring your project steps from start to finish, <br/>
            ensuring that all the steps necessary to complete your project <br/>
            have been completed.
        </p>
    </div>
    </>
    );
 }
export default About;