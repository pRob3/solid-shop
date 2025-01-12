import { A } from '@solidjs/router';
import { createResource, createSignal, For, Show } from 'solid-js';

const fetchCategories = async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  return await response.json();
};

export default function Menu() {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [categories] = createResource(fetchCategories);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen());
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu();
    }
  };

  return (
    <div class='relative'>
      {/* Hamburger / Close Button */}
      <button
        type='button'
        class='relative z-30 flex items-center justify-center w-10 h-10 rounded focus:outline-none bg-white hover:bg-gray-100 transition'
        onClick={toggleMenu}
        onKeyUp={handleKeyUp}
        aria-label={menuOpen() ? 'Close menu' : 'Open menu'}
      >
        {/* Top Line */}
        <span
          class={`absolute w-6 h-0.5 bg-black transition-all duration-300 ease-in-out transform ${
            menuOpen() ? 'rotate-45' : '-translate-y-2'
          }`}
          style='transform-origin: center;'
        />
        {/* Middle Line */}
        <span
          class={`absolute w-6 h-0.5 bg-black transition-all duration-300 ease-in-out transform ${
            menuOpen() ? 'opacity-0' : ''
          }`}
          style='transform-origin: center;'
        />
        {/* Bottom Line */}
        <span
          class={`absolute w-6 h-0.5 bg-black transition-all duration-300 ease-in-out transform ${
            menuOpen() ? '-rotate-45' : 'translate-y-2'
          }`}
          style='transform-origin: center;'
        />
      </button>

      {/* Dimmed Background */}
      <div
        class={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
          menuOpen()
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
        onKeyUp={(event: KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            toggleMenu();
          }
        }}
        tabIndex={0}
        role='button'
        aria-hidden={!menuOpen()}
      />

      {/* Menu Panel */}
      <dialog
        open={menuOpen()}
        class={`fixed top-0 left-0 w-80 max-w-full bg-white shadow-lg h-full z-30 transform transition-transform duration-500 ease-in-out ${
          menuOpen() ? 'translate-x-0' : '-translate-x-full'
        }`}
        style='margin: 0; padding: 0; border: none;' // Reset default dialog styles
        aria-label='Categories'
      >
        {/* Header */}
        <div class='p-4 border-b border-gray-200'>
          <h2 class='text-xl font-semibold text-black'>Categories</h2>
        </div>

        {/* Scrollable List */}
        <div class='overflow-y-auto h-full p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
          <Show when={categories()} fallback={<p>Loading categories...</p>}>
            <ul>
              <For each={categories()}>
                {(category) => (
                  <li>
                    <A
                      href={`/${category.slug}`} // Use the slug for the link
                      class='block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition'
                      onClick={toggleMenu}
                      onKeyUp={(event: KeyboardEvent) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          toggleMenu();
                        }
                      }}
                    >
                      {category.name}{' '}
                      {/* Ensure only category.name is rendered */}
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
      </dialog>
    </div>
  );
}
