import { Star, StarHalf } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, image, description, price, rating, badge } = product;
  
  // Render full and half stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400" size={16} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-yellow-400 text-yellow-400" size={16} />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-yellow-400" size={16} />);
    }
    
    return stars;
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover transition-transform hover:scale-105" 
          alt={name} 
        />
        {badge && (
          <div className="absolute top-0 right-0 bg-[#ffb4a2] text-white py-1 px-3 rounded-bl-lg font-medium">
            {badge}
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="font-poppins font-semibold text-lg mb-2">{name}</h4>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {renderStars()}
          </div>
          <span className="text-sm text-gray-500 ml-2">{rating}/5</span>
        </div>
        <p className="text-gray-600 mb-3 text-sm">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-[#b5838d] font-bold text-xl">₹{price}</span>
          <button className="bg-[#ffcdb2] hover:bg-[#ffb4a2] text-[#6d6875] py-2 px-4 rounded-full text-sm font-medium transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
