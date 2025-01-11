import { For } from 'solid-js';
import Card from '../components/Card';
import { useCartContext } from '../context/CartContext';

export default function Cart() {
  const { items } = useCartContext();

  const total = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div class='max-w-md my-8 mx-auto'>
      <Card rounded={true}>
        <h2>Your Shopping Cart</h2>
        <For each={items}>
          {(item) => (
            <div class='flex justify-between items-center my-2'>
              <div>
                <span class='font-bold'>{item.title}</span> x {item.quantity}
              </div>
              <div>
                ${(item.price * item.quantity).toFixed(2).toLocaleString()}
              </div>
            </div>
          )}
        </For>
        <p class='mt-8 pt-4 border-t-2 font-bold'>
          Total cart price - ${total().toFixed(2).toLocaleString()}
        </p>
      </Card>
    </div>
  );
}
