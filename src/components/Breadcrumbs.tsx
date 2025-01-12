import { A, useLocation } from '@solidjs/router';
import { createMemo } from 'solid-js';

export default function Breadcrumbs() {
  const location = useLocation();

  // Make segments reactive by creating a derived signal
  const segments = createMemo(
    () =>
      location.pathname
        .replace('/solid-shop', '') // Remove the base path
        .split('/')
        .filter(Boolean) // Remove empty strings
  );

  // Determine if we're on a product page
  const isProductPage = createMemo(() => segments().length === 2);

  // Capitalize the first letter of a string
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <nav class='text-sm text-gray-600 my-4' aria-label='Breadcrumb'>
      <ol class='flex items-center space-x-2'>
        {/* Home Link */}
        <li>
          <A
            href='/'
            class='text-gray-500 hover:text-pink-500 transition-colors'
          >
            Home
          </A>
        </li>

        {/* Separator */}
        <span class='mx-2 text-gray-400'>/</span>

        {/* Category Link */}
        <li>
          <A
            href={isProductPage() ? `/${segments()[0]}` : '#'} // Link only if on product page
            class={`capitalize ${
              isProductPage()
                ? 'text-gray-500 hover:text-pink-500 transition-colors'
                : 'text-gray-900'
            }`}
          >
            {capitalize(segments()[0] || 'Category')}
          </A>
        </li>

        {/* Separator for Product Page */}
        {isProductPage() && <span class='mx-2 text-gray-400'>/</span>}
      </ol>
    </nav>
  );
}
