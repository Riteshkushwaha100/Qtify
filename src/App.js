// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Hero from "./Components/Hero/Hero";
//import ImgMediaCard from './Components/Card/ImgMediaCard';
import Topalbums from './Components/Topalbums/Topalbums';
import Newalbs from './Components/Newalbs/Newalbs';

function App() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Topalbums />
        <Newalbs />
    </div>  
  );
}

export default App;
