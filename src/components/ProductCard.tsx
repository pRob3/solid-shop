import { A } from '@solidjs/router';
import StockStatus from './StockStatus';
import { useCartContext } from '../context/CartContext';
import type { Product } from '../services/productService';
import PriceDisplay from './PriceDisplay';

interface ProductCardProps {
  product: Product; // Pass the entire Product object
  showBuyNow: boolean;
}

export default function ProductCard({ product, showBuyNow }: ProductCardProps) {
  const { addToCart } = useCartContext();
  return (
    <div class='bg-white p-4 rounded-md shadow-md relative block hover:shadow-lg transition'>
      {/* Discount Badge */}
      {product.discountPercentage >= 1 && (
        <span class='absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
          {Math.round(product.discountPercentage)}%
        </span>
      )}

      {/* Product Image Container */}
      <div class='relative'>
        <A href={`/${product.category}/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            class='w-full h-48 object-cover mb-4 rounded-md'
          />
        </A>
        {/* Stock Status in the lower-right corner */}
        <div class='absolute bottom-2 right-2'>
          <StockStatus stock={product.stock} />
        </div>
      </div>

      {/* Product Brand and Title */}
      <p class='text-xs text-gray-500 uppercase mb-1'>{product.brand}</p>
      <h3 class='text-sm font-semibold text-gray-800 mb-2'>{product.title}</h3>

      {/* Price and Buy Now */}
      <div class='flex items-center justify-between'>
        {/* Price Display */}
        <PriceDisplay
          price={product.price}
          originalPrice={
            product.price + (product.price * product.discountPercentage) / 100
          }
          discountPercentage={product.discountPercentage}
        />
        {/* Buy Now Button */}
        {showBuyNow && (
          <button
            type='button'
            class='p-2 bg-pink-500 text-white text-sm font-bold uppercase rounded hover:bg-pink-600 transition'
            onClick={() => addToCart({ product, quantity: 1 })}
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
}
