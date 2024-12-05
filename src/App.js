// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Hero from "./Components/Hero/Hero";
//import ImgMediaCard from './Components/Card/ImgMediaCard';
import Topalbums from './Components/Topalbums/Topalbums';
import Newalbs from './Components/Newalbs/Newalbs';
import Songs from "./Components/Songs/Songs.jsx"

function App() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Topalbums />
        <Newalbs />
        <Songs />
    </div>  
  );
}

export default App;
