import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import ProductCard from "@/components/ui/product-card";
import { cementProducts, steelProducts, materialProducts, Product } from "@/data/products";
import { useQuery } from "@tanstack/react-query";

type ProductCategory = "all" | "cement" | "steel" | "materials";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const { ref: cementRef, isVisible: isCementVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: steelRef, isVisible: isSteelVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: materialsRef, isVisible: isMaterialsVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  // State for storing updated products
  const [updatedCementProducts, setUpdatedCementProducts] = useState(cementProducts);
  const [updatedSteelProducts, setUpdatedSteelProducts] = useState(steelProducts);
  const [updatedMaterialProducts, setUpdatedMaterialProducts] = useState(materialProducts);
  const [pricesLastUpdated, setPricesLastUpdated] = useState<string | null>(null);

  // Fetch prices from admin JSON file
  const { data: priceData, isLoading } = useQuery({
    queryKey: ['/api/admin/products'],
    queryFn: async () => {
      const response = await fetch('/api/admin/products');
      if (!response.ok) {
        throw new Error('Failed to fetch updated prices');
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds to get latest prices
  });

  // Update product prices when price data is fetched
  useEffect(() => {
    if (priceData?.products) {
      // Create a map for quick lookup of prices by product name
      const priceMap = new Map(
        priceData.products.map((item: { id: number; name: string; price: number }) => [item.name, item.price])
      );

      // Update cement products with new prices
      setUpdatedCementProducts(
        cementProducts.map(product => {
          const newPrice = priceMap.get(product.name);
          return newPrice !== undefined ? { ...product, price: Number(newPrice) } : product;
        })
      );

      // Update steel products with new prices
      setUpdatedSteelProducts(
        steelProducts.map(product => {
          const newPrice = priceMap.get(product.name);
          return newPrice !== undefined ? { ...product, price: Number(newPrice) } : product;
        })
      );

      // Update material products with new prices
      setUpdatedMaterialProducts(
        materialProducts.map(product => {
          const newPrice = priceMap.get(product.name);
          return newPrice !== undefined ? { ...product, price: Number(newPrice) } : product;
        })
      );

      // Set last updated timestamp
      setPricesLastUpdated(new Date().toLocaleString());
    }
  }, [priceData]);

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-3">Our Products</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a wide range of high-quality construction materials from trusted brands at competitive prices.
          </p>
          {isLoading ? (
            <div className="mt-4 text-accent">Loading latest prices...</div>
          ) : pricesLastUpdated ? (
            <div className="mt-4 text-sm text-muted-foreground">
              <span className="bg-muted px-2 py-1 rounded">
                Prices last updated: {pricesLastUpdated}
              </span>
            </div>
          ) : null}
        </div>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-primary/20"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All Products
          </button>
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "cement" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-primary/20"
            }`}
            onClick={() => setActiveCategory("cement")}
          >
            Cement
          </button>
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "steel" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-primary/20"
            }`}
            onClick={() => setActiveCategory("steel")}
          >
            Steel
          </button>
          <button 
            className={`py-2 px-6 rounded-full font-medium transition-all ${
              activeCategory === "materials" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-primary/20"
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
          <h3 className="font-poppins font-semibold text-2xl text-foreground mb-6">Cement Brands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {updatedCementProducts.map((product) => (
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
          <h3 className="font-poppins font-semibold text-2xl text-foreground mb-6">Steel Brands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedSteelProducts.map((product) => (
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
          <h3 className="font-poppins font-semibold text-2xl text-foreground mb-6">Materials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedMaterialProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-12 p-6 bg-card rounded-lg shadow-md">
          <h4 className="font-semibold text-lg text-foreground mb-2">Pricing Information</h4>
          <p className="text-card-foreground">
            Current prices shown are approximate. Actual prices may vary based on:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1 max-w-lg mx-auto">
            <li>• Quantity ordered (bulk discounts available)</li>
            <li>• Current market conditions</li>
            <li>• Seasonal variations</li>
            <li>• Special promotions (check with our store)</li>
          </ul>
          <p className="text-primary font-medium mt-3">
            We guarantee competitive pricing and price matching with authorized dealers!
          </p>
          <div className="mt-4 pt-3 border-t border-muted">
            <p className="font-medium text-foreground">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded">Note:</span> For purchases, please visit our store or contact us directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
