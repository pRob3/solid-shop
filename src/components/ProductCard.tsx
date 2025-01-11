import { A } from '@solidjs/router';
import StockStatus from './StockStatus';
import { useCartContext } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  image: string;
  brand: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  stock: number;
  buyNowButton: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  const { addToCart } = useCartContext();
  return (
    <div class='bg-white p-4 rounded-md shadow-md relative block hover:shadow-lg transition'>
      {/* Discount Badge */}
      {props.discountPercentage >= 1 && (
        <span class='absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
          {Math.round(props.discountPercentage)}%
        </span>
      )}

      {/* Product Image Container */}
      <div class='relative'>
        <A href={`/product/${props.id}`}>
          <img
            src={props.image}
            alt={props.title}
            class='w-full h-48 object-cover mb-4 rounded-md'
          />
        </A>
        {/* Stock Status in the lower-right corner */}
        <div class='absolute bottom-2 right-2'>
          <StockStatus stock={props.stock} />
        </div>
      </div>

      {/* Product Brand and Title */}
      <p class='text-xs text-gray-500 uppercase mb-1'>{props.brand}</p>
      <h3 class='text-sm font-semibold text-gray-800 mb-2'>{props.title}</h3>

      {/* Price and Buy Now */}
      <div class='flex items-center justify-between'>
        <div class='flex items-center justify-center gap-2 mb-4'>
          <p class='text-lg font-bold text-pink-500'>
            ${props.price.toFixed(2).toLocaleString()}
          </p>
          {props.discountPercentage > 0 && (
            <p class='text-sm text-gray-400 line-through'>
              ${props.originalPrice.toFixed(2).toLocaleString()}
            </p>
          )}
        </div>

        {props.buyNowButton && (
          <button
            type='button'
            class='p-2 bg-pink-500 text-white text-sm font-bold uppercase rounded hover:bg-pink-600 transition'
            onClick={() =>
              addToCart({
                id: props.id,
                title: props.title,
                price: props.price,
                quantity: 1,
              })
            }
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
}
