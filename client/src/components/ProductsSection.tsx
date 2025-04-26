import { useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import ProductCard from "@/components/ui/product-card";
import { cementProducts, steelProducts, materialProducts } from "@/data/products";

type ProductCategory = "all" | "cement" | "steel" | "materials";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const { ref: cementRef, isVisible: isCementVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: steelRef, isVisible: isSteelVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: materialsRef, isVisible: isMaterialsVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#6d6875] mb-3">Our Products</h2>
          <div className="w-20 h-1 bg-[#ffb4a2] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of high-quality construction materials from trusted brands at competitive prices.
          </p>
        </div>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "all" 
                ? "bg-[#ffcdb2] text-[#6d6875]" 
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All Products
          </button>
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "cement" 
                ? "bg-[#ffcdb2] text-[#6d6875]" 
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveCategory("cement")}
          >
            Cement
          </button>
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "steel" 
                ? "bg-[#ffcdb2] text-[#6d6875]" 
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveCategory("steel")}
          >
            Steel
          </button>
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "materials" 
                ? "bg-[#ffcdb2] text-[#6d6875]" 
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveCategory("materials")}
          >
            Materials
          </button>
        </div>
        
        {/* Cement Products */}
        <motion.div 
          ref={cementRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isCementVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={activeCategory === "all" || activeCategory === "cement" ? "block" : "hidden"}
        >
          <h3 className="font-poppins font-semibold text-2xl text-[#6d6875] mb-6">Cement Brands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cementProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Steel Products */}
        <motion.div 
          ref={steelRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isSteelVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={`mt-16 ${activeCategory === "all" || activeCategory === "steel" ? "block" : "hidden"}`}
        >
          <h3 className="font-poppins font-semibold text-2xl text-[#6d6875] mb-6">Steel Brands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steelProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Materials Products */}
        <motion.div 
          ref={materialsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isMaterialsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={`mt-16 ${activeCategory === "all" || activeCategory === "materials" ? "block" : "hidden"}`}
        >
          <h3 className="font-poppins font-semibold text-2xl text-[#6d6875] mb-6">Materials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-12 p-6 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg text-[#6d6875] mb-2">Pricing Information</h4>
          <p className="text-gray-700">
            Current prices shown are indicative. Actual prices may vary based on:
          </p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1 max-w-lg mx-auto">
            <li>• Quantity ordered (bulk discounts available)</li>
            <li>• Current market conditions</li>
            <li>• Seasonal variations</li>
            <li>• Special promotions (check with our store)</li>
          </ul>
          <p className="text-[#b5838d] font-medium mt-3">
            We guarantee competitive pricing and price matching with authorized dealers!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
