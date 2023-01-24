import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from './components/About/About';
import Home from './components/Home/Home';
import LogIn from "./components/LOGIN/Login";
import ToDo from "./components/Main/ToDoMain";
import Projects from "./components/Projects/projects";
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