import React, { useState } from "react";
import { NavLink } from "react-router";
import { navBrandClass } from '../styles/common'

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4">

      {/* Top section */}
      <div className="flex justify-between items-center">

        {/* Logo */}
        <ul className='flex justify-between items-center flex-col gap-2 p-2 lg:flex-row md:flex-row'>
          <img src='https://img.freepik.com/premium-vector/kid-reading-book-logo-template-design_316488-847.jpg' className='rounded-full w-15' />
          <NavLink to="" className={`${navBrandClass} text-xl`}>
            BlogSphere
          </NavLink>
        </ul>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          <li>
            <NavLink to="/" className={({ isActive }) =>
              isActive ? "bg-blue-100 text-blue-900 p-2 rounded-xl" : ""
            }>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/register" className={({ isActive }) =>
              isActive ? "bg-blue-100 text-blue-900 p-2 rounded-xl" : ""
            }>
              Register
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" className={({ isActive }) =>
              isActive ? "bg-blue-100 text-blue-900 p-2 rounded-xl" : ""
            }>
              Login
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden">

          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          </li>

        </ul>
      )}

    </nav>
  );
}

export default Header;