import NavBar from "../NavBar/NavBar";
import './projects.css';

function Projects() {

 return (
    <>
    <div>
        <NavBar />
    </div>
    <div className="content">
       <h2>Projects in Progress</h2>

    <ul className='list'>
       {/* <button className="button"><a onClick={() => navigate('/todolist')}>CONNECT TO WALLET</a></button> */}
        <li><a href='/todoList'> Become a Solidity Developer</a></li>
        <li> Become a Soldier </li>
        <li> Become a Teacher</li>
        <li> Become a designer </li>
    </ul>
    </div>
    </>
    );
 }
export default Projects;