import React from "react"
import './App.css';
import Home from "./Pages/index";
import NavBar from "./Pages/Navbar"

function App() {
  return (
    <>
    <NavBar/>
    <div className="App">
      <h1>Sign Up</h1>
     <Home />
    </div>
    </>
  );
}

export default App;