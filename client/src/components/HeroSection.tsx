import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="home" 
      className="relative pt-24 md:pt-0 min-h-screen flex items-center"
      style={{ 
        background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('Front_View.png') center/cover no-repeat"
      }}
    >
      <div className="container mx-auto px-4 text-center py-20">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffcdb2] to-[#ffb4a2] inline-block">Shiv Cement Store</span>
            <span className="block text-2xl md:text-3xl mt-2 font-medium text-[#ffcdb2]">— Since 2000 —</span>
          </h1>
          <p className="font-roboto text-lg md:text-xl text-gray-200 mb-8">
            Trusted by 1000+ Customers | Rated 4.8/5 ⭐
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a 
              href="#products" 
              className="bg-[#ffcdb2] hover:bg-[#ffb4a2] text-[#6d6875] font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Products
            </a>
            <a 
              href="#contact" 
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <a href="#about" className="inline-block text-white animate-bounce">
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
