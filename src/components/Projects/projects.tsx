import NavBar from "../NavBar/NavBar";
import {Link} from "react-router-dom";
import "./projects.css";

function Projects() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="content">
        <h2>Projects in Progress</h2>

        <p className="p-list">
          <button className="list-button">
            <Link to="/taskList">Become a Solidity Developer</Link>
          </button>
          <button className="list-button"> Become a Soldier </button>
          <button className="list-button"> Become a Teacher</button>
          <button className="list-button"> Become a designer </button>
        </p>
      </div>
    </>
  );
}
export default Projects;
