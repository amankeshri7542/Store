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
    image: "Ultratech Cement.jpg",
    description: "Premium quality cement for all construction needs.",
    price: 500,
    rating: 4.5,
    category: "cement",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "ACC Cement",
    image: "cment_Bags.webp",
    description: "High-strength cement for durable construction.",
    price: 500,
    rating: 5.0,
    category: "cement"
  },
  {
    id: 3,
    name: "Ambuja Cement",
    image: "615gTOt7O2L.jpg",
    description: "Reliable cement for all weather conditions.",
    price: 500,
    rating: 4.0,
    category: "cement"
  },
  {
    id: 4,
    name: "JK Cement",
    image: "100mm-concrete-cover-block-500x500.webp",
    description: "White cement for decorative finishes.",
    price: 500,
    rating: 3.5,
    category: "cement"
  }
];

export const steelProducts: Product[] = [
  {
    id: 5,
    name: "Tata Steel TMT Bars",
    image: "square-shape-polished-finish-steel-tmt-ring-for-for-building-construction-815.jpg",
    description: "Premium quality TMT bars for strong construction.",
    price: 500,
    rating: 5.0,
    category: "steel",
    badge: "Premium"
  },
  {
    id: 6,
    name: "Mahaveer Steel Rods",
    image: "square-shape-polished-finish-steel-tmt-ring-for-for-building-construction-815.jpg",
    description: "Durable steel rods for resilient structures.",
    price: 500,
    rating: 4.0,
    category: "steel"
  },
  {
    id: 7,
    name: "Panther Steel Mesh",
    image: "square-shape-polished-finish-steel-tmt-ring-for-for-building-construction-815.jpg",
    description: "Cost-effective steel for standard constructions.",
    price: 500,
    rating: 3.5,
    category: "steel"
  }
];

export const materialProducts: Product[] = [
  {
    id: 8,
    name: "Red Bricks",
    image: "red-bricks-normal-557.jpg",
    description: "High-quality red bricks for durable wall construction.",
    price: 500,
    rating: 4.8,
    category: "material",
    badge: "Top Quality"
  },
  {
    id: 9,
    name: "Stone Chips",
    image: "stone-chips-2.jpg",
    description: "Various sizes available for different construction needs.",
    price: 500,
    rating: 4.5,
    category: "material"
  },
  {
    id: 10,
    name: "Boards",
    image: "board1.webp",
    description: "High-quality boards for interior and exterior use.",
    price: 500,
    rating: 5.0,
    category: "material"
  },
  {
    id: 11,
    name: "Fly Ash Bricks",
    image: "fly-ash-cement-bricks-307.jpg",
    description: "Eco-friendly bricks with excellent structural properties.",
    price: 450,
    rating: 4.3,
    category: "material"
  }
];
