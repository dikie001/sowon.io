import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="bg-fuchsia-900 h-20 text-center sticky top-0 z-50">
        <div className="container flex justify-between mx-auto items-center">
          <h1 className="text-5xl text-green-400  font-extrabold">sowon</h1>
          <ul className="hidden md:flex space-x-6 list-none font-semibold text-amber-50">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/jokes">Jokes</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </nav>
      <button
        className="md:hidden p-2 focus:outline-none absolute top-2 right-2.5 z-100   "
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
      </button>
      {menuOpen && (
        <div className="md:hidden bg-fuchsia-900 w-full justify-center  text-amber-50 font-semibold ">
          <ul
            className="flex flex-col justify-center items-center space-y-4 cursor-pointer "
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <li className="hover:text-orange-500 ">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-orange-500 ">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-orange-500 ">
              <Link to="/jokes">Jokes</Link>
            </li>
            <li className="w-[80%] bg-orange-600 px-6 text-lg rounded-lg flex hover:bg-orange-700 items-center justify-center mb-3.5">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
