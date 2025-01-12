import { createResource, For, Show } from 'solid-js';
import ProductCard from '../components/ProductCard';
import { fetchAllProducts } from '../services/productService';

export default function Home() {
  const [products] = createResource(fetchAllProducts);

  return (
    <Show when={products()} fallback={<div>Loading...</div>}>
      <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-4'>
        <For each={products()}>
          {(product) => <ProductCard product={product} showBuyNow={true} />}
        </For>
      </div>
    </Show>
  );
}
