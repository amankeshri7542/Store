

const Footer = () => {
  return (
    <footer className="bg-[#6d6875] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-xl mb-4">Shiv Cement Store</h3>
            <p className="text-gray-300 mb-4">Providing quality construction materials since 1999. Your trusted partner for all building needs.</p>
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
                <span>Mon-Sun:</span>
                <span>6:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>© 2025 Shiv Cement Store - Built by Aman ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
