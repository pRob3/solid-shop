import { createResource, createSignal, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { useCartContext } from '../context/CartContext';
import { fetchProductById, type Product } from '../services/productService';
import StockStatus from '../components/StockStatus';

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCartContext();
  const [product] = createResource<Product>(() => fetchProductById(params.id));
  const [adding, setAdding] = createSignal(false);
  const [quantity, setQuantity] = createSignal(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = () => {
    const productData = product(); // Call product() to get the actual value
    if (!productData) return;

    setAdding(true);

    addToCart({
      id: productData.id,
      title: productData.title,
      price: productData.price,
      quantity: quantity(),
    });

    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <div class='container mx-auto my-10 px-4 lg:px-0'>
      <Show when={product()} fallback={<div>Loading...</div>} keyed>
        {(productData) => (
          <div class='grid lg:grid-cols-2 gap-10'>
            {/* Product Image */}
            <div class='flex justify-center'>
              <img
                src={productData.images[0]}
                alt={productData.title}
                class='max-w-full rounded-lg shadow-md'
              />
            </div>

            {/* Product Details */}
            <div class='flex flex-col gap-4'>
              {/* Product Info */}
              <div>
                <p class='uppercase text-sm font-semibold text-gray-500 mb-2'>
                  {productData.brand}
                </p>
                <h1 class='text-3xl font-bold mb-4'>{productData.title}</h1>
                <p class='text-sm text-gray-500 mb-6'>
                  Art.nr: {productData.sku}
                </p>

                {/* Pricing */}
                <div class='flex items-center gap-4 mb-6'>
                  <p class='text-4xl font-bold text-pink-500'>
                    ${productData.price.toFixed(2).toLocaleString()}
                  </p>
                  <p class='text-lg text-gray-500 line-through'>
                    $
                    {(
                      productData.price +
                      (productData.price * productData.discountPercentage) / 100
                    )
                      .toFixed(2)
                      .toLocaleString()}
                  </p>
                  <span class='bg-pink-100 text-pink-500 text-xs font-bold px-2 py-1 rounded-full'>
                    -{Math.round(productData.discountPercentage)}%
                  </span>
                </div>
                {/* <p class='text-sm text-gray-500 mb-4'>
                  Lowest price last 30 days:{' '}
                  <span class='font-semibold text-black'>??</span>
                </p> */}
              </div>

              {/* Add to Cart */}
              <div>
                <div class='flex items-center gap-4 mb-4'>
                  {/* Quantity Selector */}
                  <div class='flex items-center border border-gray-300 rounded'>
                    <button
                      type='button'
                      class='px-3 py-2 text-lg text-gray-700 border-r border-gray-300'
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span class='px-4 py-2 text-lg text-gray-700'>
                      {quantity()}
                    </span>
                    <button
                      type='button'
                      class='px-3 py-2 text-lg text-gray-700 border-l border-gray-300'
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type='button'
                    class='btn'
                    onClick={handleAddToCart}
                    disabled={adding()}
                  >
                    {adding() ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>

                {/* Stock & Shipping Info */}
                <div class='text-sm text-gray-600'>
                  <StockStatus stock={productData.stock} />
                  <p class='font-semibold mt-3'>
                    Delivery:{' '}
                    <span class='text-blue-500'>
                      {productData.shippingInformation}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div class='lg:col-span-2 mt-10'>
              <h2 class='text-xl font-bold mb-4'>Product Description</h2>
              <p class='text-gray-700'>{productData.description}</p>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}
