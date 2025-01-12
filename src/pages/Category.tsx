import { createResource, For } from 'solid-js';
import { useParams } from '@solidjs/router';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

// Fetch products by category
const fetchCategoryProducts = async (category: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data = await response.json();
  return data.products;
};

export default function Category() {
  const params = useParams(); // Retrieve the :category parameter
  const [products] = createResource(
    () => params.category,
    fetchCategoryProducts
  );

  return (
    <div class='container mx-auto my-8 px-4'>
      <Breadcrumbs />
      <h1 class='text-2xl font-bold mb-6 capitalize'>{params.category}</h1>
      <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <For each={products()} fallback={<p>Loading...</p>}>
          {(product) => <ProductCard product={product} showBuyNow={true} />}
        </For>
      </div>
    </div>
  );
}
