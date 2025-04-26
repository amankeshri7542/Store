export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  category: "cement" | "steel" | "material";
  badge?: string;
}

export const cementProducts: Product[] = [
  {
    id: 1,
    name: "UltraTech Cement",
    image: "https://images.unsplash.com/photo-1577646036505-3be513beb24d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Premium quality cement for all construction needs.",
    price: 500,
    rating: 4.5,
    category: "cement",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "ACC Cement",
    image: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "High-strength cement for durable construction.",
    price: 500,
    rating: 5.0,
    category: "cement"
  },
  {
    id: 3,
    name: "Ambuja Cement",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Reliable cement for all weather conditions.",
    price: 500,
    rating: 4.0,
    category: "cement"
  },
  {
    id: 4,
    name: "JK Cement",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "White cement for decorative finishes.",
    price: 500,
    rating: 3.5,
    category: "cement"
  }
];

export const steelProducts: Product[] = [
  {
    id: 5,
    name: "Tata Steel",
    image: "https://images.unsplash.com/photo-1605503299891-c01db1260bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Premium quality TMT bars for strong construction.",
    price: 500,
    rating: 5.0,
    category: "steel"
  },
  {
    id: 6,
    name: "Mahaveer Steel",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Durable steel rods for resilient structures.",
    price: 500,
    rating: 4.0,
    category: "steel"
  },
  {
    id: 7,
    name: "Panther Steel",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Cost-effective steel for standard constructions.",
    price: 500,
    rating: 3.5,
    category: "steel"
  }
];

export const materialProducts: Product[] = [
  {
    id: 8,
    name: "Sand",
    image: "https://images.unsplash.com/photo-1560704429-55ddd6639afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Fine quality sand for smooth finishes.",
    price: 500,
    rating: 4.0,
    category: "material"
  },
  {
    id: 9,
    name: "Stone Chips",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Various sizes available for different construction needs.",
    price: 500,
    rating: 4.5,
    category: "material"
  },
  {
    id: 10,
    name: "Bricks",
    image: "https://images.unsplash.com/photo-1635582943085-8d6f3c74555f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Solid clay bricks for durable wall construction.",
    price: 500,
    rating: 5.0,
    category: "material"
  }
];
