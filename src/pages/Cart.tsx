import { For } from 'solid-js';
import { useCartContext } from '../context/CartContext';
import StockStatus from '../components/StockStatus';
import PriceDisplay from '../components/PriceDisplay';

export default function CartPage() {
  const { items, updateCartItem, removeFromCart } = useCartContext();

  const subtotal = () =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalDiscount = () =>
    items.reduce(
      (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
      0
    );

  const grandTotal = () => subtotal() - totalDiscount();

  const handleQuantityChange = (id: number, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateCartItem(id, newQuantity);
      }
    }
  };

  return (
    <div class='container mx-auto my-8 px-4'>
      {/* Cart Wrapper */}
      <div class='bg-white shadow-md rounded-md p-6'>
        {/* Cart Title */}
        <h1 class='text-xl font-bold text-black mb-6'>Cart</h1>

        {/* Cart Items */}
        <div class='divide-y divide-gray-300'>
          <For each={items}>
            {(item) => (
              <div class='py-4 flex gap-4 items-center'>
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  class='w-24 h-24 object-cover rounded-md'
                />

                {/* Product Details */}
                <div class='flex-1'>
                  <p class='text-sm uppercase font-semibold text-gray-500'>
                    {item.brand}
                  </p>
                  <h2 class='text-lg font-bold text-gray-800'>{item.title}</h2>

                  {/* Price Display */}
                  <PriceDisplay
                    price={item.price}
                    originalPrice={item.originalPrice}
                    discountPercentage={item.discountPercentage}
                  />

                  {/* Stock Status */}
                  <StockStatus stock={item.stock} />
                </div>

                {/* Quantity Selector */}
                <div class='flex items-center gap-2'>
                  <button
                    type='button'
                    class='p-2 border rounded bg-gray-200 text-gray-800'
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span class='text-lg font-semibold'>{item.quantity}</span>
                  <button
                    type='button'
                    class='p-2 border rounded bg-gray-200 text-gray-800'
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Item Total Price */}
                <p class='text-lg font-bold text-pink-500 w-20 text-right'>
                  ${(item.price * item.quantity).toFixed(2).toLocaleString()}
                </p>

                {/* Remove Button */}
                <button
                  type='button'
                  class='text-red-500 hover:text-red-700 ml-4'
                  onClick={() => removeFromCart(item.id)}
                  aria-label='Remove item from cart'
                >
                  ×
                </button>
              </div>
            )}
          </For>
        </div>

        {/* Cart Summary */}
        <div class='mt-8 pt-4 border-t-2'>
          <div class='text-sm font-medium flex justify-between mb-2'>
            <span>Subtotal</span>
            <span>${subtotal().toFixed(2).toLocaleString()}</span>
          </div>
          <div class='text-sm font-medium flex justify-between mb-2 text-green-600'>
            <span>Discount</span>
            <span>-${totalDiscount().toFixed(2).toLocaleString()}</span>
          </div>
          <div class='text-sm font-medium flex justify-between mb-4 text-gray-500'>
            <span>Shipping fee</span>
            <span>No shipping selected</span>
          </div>
          <div class='text-lg font-bold flex justify-between'>
            <span>Grand total</span>
            <span>${grandTotal().toFixed(2).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
