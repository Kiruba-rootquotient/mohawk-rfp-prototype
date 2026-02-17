export interface Product {
  id: string;
  sku: string;
  name: string;
  type: 'Carpet Tile' | 'Hardwood' | 'Vinyl' | 'Laminate' | 'Ceramic Tile';
  collection: string;
  price: number;
  pricePerBox: number;
  boxSize: string;
  image: string;
  rating: number;
  reviewCount: number;
  colors: number;
  inStock: boolean;
  stockCount?: number;
  badge?: 'Best Seller' | 'Trending' | 'New' | 'Limited Stock';
  description: string;
  specifications: {
    fiberType?: string;
    backingType?: string;
    surfaceAppearance?: string;
    dyeMethod?: string;
    faceWeight?: string;
    size: string;
    warranty?: string;
    installation?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  reserved: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shipTo: string;
  estimatedArrival?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  customerId: string;
  company: string;
}
