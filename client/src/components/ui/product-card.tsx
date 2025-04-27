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
    <div className="product-card bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border border-muted">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover transition-transform hover:scale-105" 
          alt={name} 
        />
        {badge && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-3 rounded-bl-lg font-medium">
            {badge}
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="font-poppins font-semibold text-lg mb-2 text-foreground">{name}</h4>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {renderStars()}
          </div>
          <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
        </div>
        <p className="text-muted-foreground mb-3 text-sm">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-xl">₹{price}</span>
          <span className="text-muted-foreground text-sm">Per unit</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
