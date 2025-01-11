import { createResource, For, Show } from 'solid-js';
import ProductCard from '../components/ProductCard';
import { fetchAllProducts } from '../services/productService';

export default function Home() {
  const [products] = createResource(fetchAllProducts);

  return (
    <Show when={products()} fallback={<div>Loading...</div>}>
      <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-4'>
        <For each={products()}>
          {(product) => (
            <ProductCard
              id={product.id}
              image={product.images[0]}
              brand={product.brand}
              title={product.title}
              price={product.price}
              originalPrice={
                product.price +
                (product.price * product.discountPercentage) / 100
              }
              discountPercentage={product.discountPercentage}
              stock={product.stock}
              buyNowButton={true}
            />
          )}
        </For>
      </div>
    </Show>
  );
}
