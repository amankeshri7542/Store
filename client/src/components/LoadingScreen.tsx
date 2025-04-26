import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
      style={{ backgroundColor: "#ffcdb2" }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 1.1]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.25, 0.75, 1]
        }}
        className="w-[150px] h-[150px]"
        style={{ 
          animation: "glow 2s infinite"
        }}
      >
        <img 
          src="Om.jpg" 
          alt="Om Symbol" 
          className="w-full h-full object-contain" 
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
