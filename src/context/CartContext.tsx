import { createContext, useContext, type JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Product } from '../services/productService';

export interface CartItem {
  id: number;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  stock: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType>();

export function CartProvider(props: { children: JSX.Element }) {
  const [items, setItems] = createStore<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = items.find((i) => i.id === product.id);
    if (existingItem) {
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: product.price,
          originalPrice:
            product.price + (product.price * product.discountPercentage) / 100,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          image: product.images[0],
          quantity: 1,
        },
      ]);
    }
  };

  const updateCartItem = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateCartItem, removeFromCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
