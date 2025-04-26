import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Trophy, Award, Users } from "lucide-react";

const AboutSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#6d6875] mb-3">About Us</h2>
          <div className="w-20 h-1 bg-[#ffb4a2] mx-auto"></div>
        </div>
        
        <motion.div 
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Started in 1999 from selling in kilos to now selling in trucks, Shiv Cement Store has built a reputation of trust and reliability among our 1000+ customers.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              We pride ourselves on providing the highest quality construction materials at competitive prices. Our commitment to excellence has earned us recognition not only locally but globally.
            </p>
            <div className="bg-[#ffcdb2] p-6 rounded-lg shadow-md">
              <h3 className="font-poppins font-semibold text-xl mb-3 text-[#6d6875]">Our Achievements</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Trophy className="text-[#b5838d] mt-1 mr-3" size={20} />
                  <span>Awarded by Anand Mahindra for excellence in business</span>
                </li>
                <li className="flex items-start">
                  <Award className="text-[#b5838d] mt-1 mr-3" size={20} />
                  <span>Recognized globally for quality standards</span>
                </li>
                <li className="flex items-start">
                  <Users className="text-[#b5838d] mt-1 mr-3" size={20} />
                  <span>Trusted by 1000+ customers with 4.8/5 rating</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621817140893-2eb374c13609?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Shiv Cement Store Exterior" 
                className="rounded-lg shadow-xl w-full object-cover h-[400px]" 
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="text-center">
                  <p className="font-poppins font-bold text-3xl text-[#b5838d]">25+</p>
                  <p className="text-[#6d6875] text-sm">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
