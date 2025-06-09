import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <header
      className={`w-full px-6 md:px-20 lg:px-28 py-4 md:py-6 flex justify-between items-center fixed top-0 left-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "bg-black/50" : "bg-transparent"
      }`}
      style={{ height: "100px" }}
    >
      <div className="text-4xl font-extrabold text-white tracking-wide">LOGO</div>

      <nav className="hidden md:flex gap-8 text-gray-700 font-medium text-[20px]">
        {["home", "about", "services", "contact"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={() => handleClick(section)}
            className={`text-white transition-colors duration-200 ${
              activeSection === section ? "underline underline-offset-4 font-bold" : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </nav>

      <div className="md:hidden text-3xl text-white cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? "✕" : "☰"}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[100px] left-2 right-2 w-auto backdrop-blur-md flex flex-col items-center gap-2 py-4 rounded-3xl md:hidden bg-white/10"
          >
            {["home", "about", "services", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => handleClick(section)}
                className={`w-11/12 text-center bg-white text-blue-900 font-semibold py-2 px-4 rounded-full shadow hover:bg-blue-100 transition duration-200 ${
                  activeSection === section ? "bg-blue-200 font-bold" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
