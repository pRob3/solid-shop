import { createContext, useContext, type JSX } from 'solid-js';
import { createStore } from 'solid-js/store';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType>();

export function CartProvider(props: { children: JSX.Element }) {
  const [items, setItems] = createStore<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      );
    } else {
      setItems([...items, item]);
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
