import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from './assets/About/About';
import Home from './assets/Home/Home';
import LogIn from './assets/LOGIN/Login';
import ToDo from './assets/Main/ToDoMain';
import Projects from "./assets/Projects/projects";
import './App.css';

export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/todolist' element={<ToDo />} />
      </Routes>
    </BrowserRouter>
  );
}