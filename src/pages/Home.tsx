import { createResource, For, Show } from 'solid-js';
import Card from '../components/Card';
import { A } from '@solidjs/router';
import { fetchAllProducts } from '../services/productService'; // Import from productService

export default function Home() {
  const [products] = createResource(fetchAllProducts); // Use fetchAllProducts from the service

  return (
    <Show when={products()} fallback={<div>Loading...</div>}>
      <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-4'>
        <For each={products()}>
          {(product) => (
            <Card rounded={true} flat={true}>
              <img
                src={product.images[0]}
                alt={product.title}
                class='w-full h-48 object-cover'
              />
              <h2 class='my-3 font-bold'>{product.title}</h2>
              <A href={`/product/${product.id}`} class='btn'>
                View Product
              </A>
            </Card>
          )}
        </For>
      </div>
    </Show>
  );
}
