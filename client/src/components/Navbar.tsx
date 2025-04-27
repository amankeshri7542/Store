import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Home, User, Package, Phone, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full bg-[#30475e] z-50 transition-all duration-300 ${scrolled ? 'shadow-lg py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-[#ececec] font-poppins font-bold text-xl md:text-2xl cursor-pointer">
          Shiv Cement Store
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#home" className="text-[#ececec] hover:text-[#3282b8] font-medium transition-colors flex items-center"><Home size={18} className="mr-1" />Home</a></li>
            <li><a href="#about" className="text-[#ececec] hover:text-[#3282b8] font-medium transition-colors flex items-center"><User size={18} className="mr-1" />About</a></li>
            <li><a href="#products" className="text-[#ececec] hover:text-[#3282b8] font-medium transition-colors flex items-center"><Package size={18} className="mr-1" />Products</a></li>
            <li><a href="#contact" className="text-[#ececec] hover:text-[#3282b8] font-medium transition-colors flex items-center"><Phone size={18} className="mr-1" />Contact</a></li>
          </ul>
        </nav>
        <button 
          className="md:hidden text-[#ececec] focus:outline-none bg-[#3282b8] p-2 rounded-full" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu - Slide down with animation */}
      <div 
        className={`md:hidden bg-[#222831] overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <ul className="space-y-1">
            <li>
              <a 
                href="#home" 
                className="flex items-center text-[#ececec] hover:text-[#3282b8] hover:bg-[#393e46] font-medium py-3 px-3 rounded transition-all"
                onClick={closeMenu}
              >
                <Home size={20} className="mr-3 text-[#3282b8]" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="flex items-center text-[#ececec] hover:text-[#3282b8] hover:bg-[#393e46] font-medium py-3 px-3 rounded transition-all"
                onClick={closeMenu}
              >
                <User size={20} className="mr-3 text-[#3282b8]" />
                <span>About</span>
              </a>
            </li>
            <li>
              <a 
                href="#products" 
                className="flex items-center text-[#ececec] hover:text-[#3282b8] hover:bg-[#393e46] font-medium py-3 px-3 rounded transition-all"
                onClick={closeMenu}
              >
                <Package size={20} className="mr-3 text-[#3282b8]" />
                <span>Products</span>
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="flex items-center text-[#ececec] hover:text-[#3282b8] hover:bg-[#393e46] font-medium py-3 px-3 rounded transition-all"
                onClick={closeMenu}
              >
                <Phone size={20} className="mr-3 text-[#3282b8]" />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
