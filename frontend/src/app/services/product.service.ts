import { Injectable } from '@angular/core';
import { Product } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    // Carpet Tiles
    {
      id: '1',
      sku: 'BT416',
      name: 'Solve II Tile',
      type: 'Carpet Tile',
      collection: 'Oak Collection',
      price: 4200.00,
      pricePerBox: 84.00,
      boxSize: '50 sq ft',
      image: 'https://images.unsplash.com/photo-1660394585016-508f949df960?w=800',
      rating: 4.2,
      reviewCount: 128,
      colors: 12,
      inStock: true,
      stockCount: 250,
      badge: 'Best Seller',
      description: 'Commercial-grade carpet tile with superior durability and style.',
      specifications: {
        fiberType: 'Nylon',
        backingType: 'SonicBac',
        surfaceAppearance: 'Textured Loop',
        dyeMethod: 'Solution Dyed',
        faceWeight: '24 oz',
        size: '24" x 24"',
        warranty: '15 Year Commercial',
        installation: 'QuarterTurn'
      }
    },
    {
      id: '2',
      sku: 'BT432',
      name: 'Artisan Tile',
      type: 'Carpet Tile',
      collection: 'Designer Series',
      price: 5600.00,
      pricePerBox: 112.00,
      boxSize: '50 sq ft',
      image: 'https://images.unsplash.com/photo-1588421874990-1fe162747f9b?w=800',
      rating: 4.8,
      reviewCount: 92,
      colors: 18,
      inStock: true,
      stockCount: 180,
      badge: 'Trending',
      description: 'Luxurious carpet tile with artisan-inspired patterns.',
      specifications: {
        fiberType: 'EcoFlex Nylon',
        backingType: 'Infinity',
        surfaceAppearance: 'Cut Pile',
        dyeMethod: 'Precision Dye Injection',
        faceWeight: '28 oz',
        size: '24" x 24"',
        warranty: '20 Year Commercial',
        installation: 'QuarterTurn'
      }
    },
    {
      id: '3',
      sku: 'BT489',
      name: 'Metro Mix Tile',
      type: 'Carpet Tile',
      collection: 'Urban Collection',
      price: 3800.00,
      pricePerBox: 76.00,
      boxSize: '50 sq ft',
      image: 'https://images.unsplash.com/photo-1534889156217-d643df14f14a?w=800',
      rating: 4.5,
      reviewCount: 156,
      colors: 10,
      inStock: true,
      stockCount: 320,
      description: 'Modern urban aesthetic with excellent performance.',
      specifications: {
        fiberType: 'Recycled Nylon',
        backingType: 'EcoWorx',
        surfaceAppearance: 'Level Loop',
        dyeMethod: 'Solution Dyed',
        faceWeight: '22 oz',
        size: '24" x 24"',
        warranty: '12 Year Commercial',
        installation: 'Ashlar'
      }
    },
    // Hardwood
    {
      id: '4',
      sku: 'HW201',
      name: 'Oak Refined',
      type: 'Hardwood',
      collection: 'Heritage Collection',
      price: 8400.00,
      pricePerBox: 168.00,
      boxSize: '20 sq ft',
      image: 'https://images.unsplash.com/photo-1611600700192-d87eaeed4f81?w=800',
      rating: 4.9,
      reviewCount: 243,
      colors: 8,
      inStock: true,
      stockCount: 150,
      badge: 'Best Seller',
      description: 'Premium white oak hardwood with natural character.',
      specifications: {
        size: '5" x Random Length',
        warranty: 'Lifetime Residential',
        installation: 'Nail/Staple/Glue'
      }
    },
    {
      id: '5',
      sku: 'HW218',
      name: 'Walnut Reserve',
      type: 'Hardwood',
      collection: 'Premium Collection',
      price: 12600.00,
      pricePerBox: 252.00,
      boxSize: '20 sq ft',
      image: 'https://images.unsplash.com/photo-1725422731244-a546b1f12707?w=800',
      rating: 5.0,
      reviewCount: 87,
      colors: 5,
      inStock: true,
      stockCount: 75,
      badge: 'New',
      description: 'Exquisite American walnut with rich, dark tones.',
      specifications: {
        size: '5" x Random Length',
        warranty: 'Lifetime Residential',
        installation: 'Nail/Staple/Glue'
      }
    },
    {
      id: '6',
      sku: 'HW245',
      name: 'Maple Classic',
      type: 'Hardwood',
      collection: 'Traditional Collection',
      price: 7200.00,
      pricePerBox: 144.00,
      boxSize: '20 sq ft',
      image: 'https://images.unsplash.com/photo-1593940643939-d078d8408aa3?w=800',
      rating: 4.6,
      reviewCount: 198,
      colors: 6,
      inStock: true,
      stockCount: 200,
      description: 'Timeless maple hardwood with smooth grain.',
      specifications: {
        size: '3.25" x Random Length',
        warranty: '50 Year Residential',
        installation: 'Nail/Staple'
      }
    },
    // Vinyl
    {
      id: '7',
      sku: 'VL305',
      name: 'RevWood Plus',
      type: 'Vinyl',
      collection: 'RevWood Collection',
      price: 5200.00,
      pricePerBox: 104.00,
      boxSize: '24 sq ft',
      image: 'https://images.unsplash.com/photo-1519393890420-f28727375fa5?w=800',
      rating: 4.7,
      reviewCount: 312,
      colors: 15,
      inStock: false,
      stockCount: 0,
      badge: 'Trending',
      description: 'Waterproof luxury vinyl with authentic wood look.',
      specifications: {
        size: '7" x 48"',
        warranty: 'Lifetime Residential',
        installation: 'Floating/Glue'
      }
    },
    {
      id: '8',
      sku: 'VL312',
      name: 'SolidTech',
      type: 'Vinyl',
      collection: 'SolidTech Collection',
      price: 6400.00,
      pricePerBox: 128.00,
      boxSize: '24 sq ft',
      image: 'https://images.unsplash.com/photo-1678794792916-e5cb1217bed1?w=800',
      rating: 4.8,
      reviewCount: 267,
      colors: 12,
      inStock: true,
      stockCount: 290,
      badge: 'Best Seller',
      description: 'Rigid core vinyl plank with superior stability.',
      specifications: {
        size: '9" x 60"',
        warranty: 'Lifetime Residential + Commercial',
        installation: 'Floating'
      }
    },
    // Laminate
    {
      id: '9',
      sku: 'LM401',
      name: 'TecWood Select',
      type: 'Laminate',
      collection: 'TecWood Collection',
      price: 3200.00,
      pricePerBox: 64.00,
      boxSize: '20 sq ft',
      image: 'https://images.unsplash.com/photo-1643902917449-98c7ef8c9685?w=800',
      rating: 4.4,
      reviewCount: 445,
      colors: 20,
      inStock: true,
      stockCount: 500,
      description: 'Durable laminate with AC4 rating for high traffic.',
      specifications: {
        size: '7.5" x 54"',
        warranty: '25 Year Residential',
        installation: 'Floating'
      }
    },
    {
      id: '10',
      sku: 'LM428',
      name: 'Coastal Living',
      type: 'Laminate',
      collection: 'Coastal Collection',
      price: 2800.00,
      pricePerBox: 56.00,
      boxSize: '20 sq ft',
      image: 'https://images.unsplash.com/photo-1575204015311-0fe377370780?w=800',
      rating: 4.3,
      reviewCount: 178,
      colors: 8,
      inStock: true,
      stockCount: 380,
      badge: 'Limited Stock',
      description: 'Light, airy laminate with coastal-inspired aesthetics.',
      specifications: {
        size: '6" x 48"',
        warranty: '20 Year Residential',
        installation: 'Floating'
      }
    },
    // Ceramic Tiles
    {
      id: '11',
      sku: 'CT501',
      name: 'Porcelain Elite',
      type: 'Ceramic Tile',
      collection: 'Elite Collection',
      price: 4800.00,
      pricePerBox: 96.00,
      boxSize: '15 sq ft',
      image: 'https://images.unsplash.com/photo-1523350165414-082d792c4bcc?w=800',
      rating: 4.9,
      reviewCount: 156,
      colors: 6,
      inStock: true,
      stockCount: 220,
      badge: 'Best Seller',
      description: 'Premium porcelain tile with marble-like finish.',
      specifications: {
        size: '12" x 24"',
        warranty: 'Lifetime',
        installation: 'Thin-set Mortar'
      }
    },
    {
      id: '12',
      sku: 'CT518',
      name: 'Ceramic Classic',
      type: 'Ceramic Tile',
      collection: 'Classic Collection',
      price: 3400.00,
      pricePerBox: 68.00,
      boxSize: '15 sq ft',
      image: 'https://images.unsplash.com/photo-1614598632980-35ee54daa5b9?w=800',
      rating: 4.5,
      reviewCount: 289,
      colors: 10,
      inStock: true,
      stockCount: 410,
      description: 'Versatile ceramic tile for walls and floors.',
      specifications: {
        size: '12" x 12"',
        warranty: '25 Year',
        installation: 'Thin-set Mortar'
      }
    }
  ];

  constructor() {
    // Generate additional products to reach 48 total
    this.generateAdditionalProducts();
  }

  private generateAdditionalProducts(): void {
    const images = [
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800',
      'https://images.unsplash.com/photo-1585128792020-803d29415281?w=800',
      'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?w=800',
      'https://images.unsplash.com/photo-1613096061311-9a839e855a3f?w=800',
      'https://images.unsplash.com/photo-1613621792067-8e28d16b735c?w=800',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800'
    ];

    const types: Array<Product['type']> = ['Carpet Tile', 'Hardwood', 'Vinyl', 'Laminate', 'Ceramic Tile'];
    const collections = ['Premium', 'Designer', 'Classic', 'Modern', 'Traditional'];
    const badges: Array<Product['badge']> = ['Best Seller', 'Trending', 'New', 'Limited Stock'];

    for (let i = 13; i <= 48; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const collection = collections[Math.floor(Math.random() * collections.length)];
      const badge = Math.random() > 0.6 ? badges[Math.floor(Math.random() * badges.length)] : undefined;
      const inStock = Math.random() > 0.15;

      this.products.push({
        id: i.toString(),
        sku: `${type.substring(0, 2).toUpperCase()}${(500 + i).toString()}`,
        name: `${collection} ${type} ${i}`,
        type: type,
        collection: `${collection} Collection`,
        price: Math.floor(Math.random() * 8000) + 2000,
        pricePerBox: Math.floor(Math.random() * 150) + 50,
        boxSize: type === 'Ceramic Tile' ? '15 sq ft' : type === 'Carpet Tile' ? '50 sq ft' : '20 sq ft',
        image: images[Math.floor(Math.random() * images.length)],
        rating: Math.floor(Math.random() * 15 + 35) / 10,
        reviewCount: Math.floor(Math.random() * 400) + 50,
        colors: Math.floor(Math.random() * 15) + 5,
        inStock: inStock,
        stockCount: inStock ? Math.floor(Math.random() * 400) + 50 : 0,
        badge: badge,
        description: `Premium ${type.toLowerCase()} with excellent quality and durability.`,
        specifications: {
          size: type === 'Carpet Tile' ? '24" x 24"' : '7" x 48"',
          warranty: '20 Year Residential',
          installation: 'Professional Installation Recommended'
        }
      });
    }
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.type.toLowerCase().includes(lowerQuery)
    );
  }

  filterProducts(filters: {
    type?: string[];
    collection?: string[];
    inStock?: boolean;
    priceRange?: { min: number; max: number };
  }): Product[] {
    let filtered = [...this.products];

    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(p => filters.type!.includes(p.type));
    }

    if (filters.collection && filters.collection.length > 0) {
      filtered = filtered.filter(p => filters.collection!.includes(p.collection));
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(p => p.inStock === filters.inStock);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p =>
        p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      );
    }

    return filtered;
  }
}
