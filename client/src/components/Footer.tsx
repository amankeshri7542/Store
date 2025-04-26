import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#6d6875] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-xl mb-4">Shiv Cement Store</h3>
            <p className="text-gray-300 mb-4">Providing quality construction materials since 1999. Your trusted partner for all building needs.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#ffcdb2] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#ffcdb2] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#ffcdb2] transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-[#ffcdb2] transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-[#ffcdb2] transition-colors">About Us</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-[#ffcdb2] transition-colors">Products</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-[#ffcdb2] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>© 2025 Shiv Cement Store - Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
