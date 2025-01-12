interface PriceDisplayProps {
  price: number;
  originalPrice: number;
  discountPercentage: number;
}

export default function PriceDisplay(props: PriceDisplayProps) {
  return (
    <div class='flex items-center gap-2'>
      <p class='text-lg font-bold text-pink-500'>
        ${props.price.toFixed(2).toLocaleString()}
      </p>
      {props.discountPercentage > 0 && (
        <p class='text-sm text-gray-400 line-through'>
          ${props.originalPrice.toFixed(2).toLocaleString()}
        </p>
      )}
    </div>
  );
}
