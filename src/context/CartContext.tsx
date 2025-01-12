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

interface AddToCart {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (addToCart: AddToCart) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType>();

export function CartProvider(props: { children: JSX.Element }) {
  const [items, setItems] = createStore<CartItem[]>([]);

  const addToCart = (addToCart: AddToCart) => {
    const existingItem = items.find((i) => i.id === addToCart.product.id);
    if (existingItem) {
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.id === addToCart.product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          id: addToCart.product.id,
          title: addToCart.product.title,
          brand: addToCart.product.brand,
          price: addToCart.product.price,
          originalPrice:
            addToCart.product.price +
            (addToCart.product.price * addToCart.product.discountPercentage) /
              100,
          discountPercentage: addToCart.product.discountPercentage,
          stock: addToCart.product.stock,
          image: addToCart.product.images[0],
          quantity: addToCart.quantity,
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
