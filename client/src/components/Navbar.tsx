import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

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

  return (
    <header className={`fixed top-0 left-0 w-full bg-white bg-opacity-95 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-[#b5838d] font-poppins font-bold text-xl md:text-2xl cursor-pointer">
          Shiv Cement Store
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#home" className="text-[#6d6875] hover:text-[#b5838d] font-medium transition-colors">Home</a></li>
            <li><a href="#about" className="text-[#6d6875] hover:text-[#b5838d] font-medium transition-colors">About</a></li>
            <li><a href="#products" className="text-[#6d6875] hover:text-[#b5838d] font-medium transition-colors">Products</a></li>
            <li><a href="#contact" className="text-[#6d6875] hover:text-[#b5838d] font-medium transition-colors">Contact</a></li>
          </ul>
        </nav>
        <button 
          className="md:hidden text-[#6d6875] focus:outline-none" 
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-inner">
          <ul className="space-y-3">
            <li>
              <a 
                href="#home" 
                className="block text-[#6d6875] hover:text-[#b5838d] font-medium py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="block text-[#6d6875] hover:text-[#b5838d] font-medium py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#products" 
                className="block text-[#6d6875] hover:text-[#b5838d] font-medium py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="block text-[#6d6875] hover:text-[#b5838d] font-medium py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
