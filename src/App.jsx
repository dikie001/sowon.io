import React from "react";
import { Navbar } from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Jokes from "./components/Jokes";
import Contact from "./components/Contact";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};
export default App;
