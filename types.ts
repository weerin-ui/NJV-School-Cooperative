export interface Student {
  id: string;
  name: string;
  grade: string;
}

export interface Transaction {
  id: string;
  amount: number;
  buyer: string; // Student name
  buyerId: string; // Student ID
  date: string; // ISO string format
}

// FIX: Add Product interface for ProductCard.tsx
export interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

// FIX: Add CartItem interface for Cart.tsx
export interface CartItem extends Product {
  quantity: number;
}
