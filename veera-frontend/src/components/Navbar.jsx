import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Services" },
    { to: "/projects", label: "Project" },
    { to: "/photos", label: "Photos" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 text-sky-800 font-extrabold tracking-wide"
        >
          <img src="/images/logo-veera.svg" alt="Veera" className="h-8 w-8" />
          <span className="text-lg md:text-xl">Veera Polymers & Chemicals</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-[15px]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`hover:text-sky-700 transition ${
                pathname === l.to
                  ? "text-sky-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 rounded-full bg-sky-700 text-white px-4 py-2 hover:bg-sky-800 transition"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-sky-800 hover:bg-sky-50 transition"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            // Close Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Menu Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white border-t shadow-sm"
          >
            <div className="flex flex-col items-start px-6 py-4 space-y-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={closeMenu}
                  className={`w-full py-2 text-[16px] transition ${
                    pathname === l.to
                      ? "text-sky-700 font-semibold"
                      : "text-gray-700 hover:text-sky-700"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={closeMenu}
                className="mt-3 w-full text-center rounded-full bg-sky-700 text-white py-2 hover:bg-sky-800 transition"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

