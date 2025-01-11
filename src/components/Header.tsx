import { A } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';
import { useCartContext } from '../context/CartContext';
import { useUserContext } from '../context/UserContext';

interface HeaderProps {
  setIsFocused: (value: boolean) => void; // Prop to update focus state in App
}

export default function Header(props: HeaderProps) {
  const { isLoggedIn, logout } = useUserContext();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const { items } = useCartContext();
  const quantity = () => items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <header class='bg-white shadow-md dark:bg-gray-900 dark:text-white relative z-20'>
        <div class='container grid gap-1 md:grid-cols-2 lg:grid-cols-4'>
          {/* Logo and Mobile Menu Button */}
          <div class='order-1 col-span-1 lg:col-span-1 lg:order-1 flex items-center gap-1 justify-start'>
            <div class='px-4 py-2 flex items-center justify-between'>
              <div class='flex items-center gap-4'>
                {/* Hamburger Menu */}
                <button
                  type='button'
                  class='text-2xl flex items-center lg:order-last'
                  onClick={() => setMenuOpen(!menuOpen())}
                >
                  <span class='material-symbols-outlined'>menu</span>
                  <span class='hidden lg:inline ml-2'>Menu</span>
                </button>

                {/* Logo */}
                <A
                  href='/'
                  class='flex items-center text-xl font-bold text-primary'
                >
                  SolidShop
                </A>
              </div>
            </div>
          </div>

          {/* Actions (Cart, Login/Logout) */}
          <div class='order-1 col-span-1 lg:col-span-1 lg:order-3 flex items-center gap-6 justify-end'>
            <A
              href='/store-locator'
              class='text-gray-600 dark:text-gray-300 flex items-center gap-1'
            >
              <span class='material-symbols-outlined flex-shrink-0'>
                location_on
              </span>
              <span class='hidden xl:inline'>Stores</span>
            </A>

            <Show
              when={isLoggedIn()}
              fallback={
                <A
                  href='/login'
                  class='text-gray-600 dark:text-gray-300 flex items-center gap-1'
                >
                  <span class='material-symbols-outlined flex-shrink-0'>
                    account_circle
                  </span>
                  <span class='hidden xl:inline'>Login</span>
                </A>
              }
            >
              <button
                type='button'
                class='text-gray-600 dark:text-gray-300 flex items-center gap-1'
                onClick={() => logout()}
              >
                <span class='material-symbols-outlined flex-shrink-0'>
                  logout
                </span>
                <span class='hidden xl:inline'>Logout</span>
              </button>
            </Show>

            {/* Cart */}
            <A
              href='/cart'
              class='relative text-gray-600 dark:text-gray-300 flex items-center gap-1 mr-4'
            >
              <span class='relative flex items-center'>
                <span class='material-symbols-outlined'>shopping_cart</span>
                {quantity() > 0 && (
                  <span class='absolute -top-2 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                    {quantity()}
                  </span>
                )}
              </span>
              <span class='hidden xl:inline'>Cart</span>
            </A>
          </div>

          {/* Search Bar */}
          <div class='order-3 col-span-2 lg:order-2 lg:col-span-2'>
            <div class='block lg:block bg-gray-100 dark:bg-gray-800 py-2'>
              <div class='container mx-auto px-4 flex flex-col lg:flex-row gap-2 lg:gap-0 items-center'>
                {/* Search Input with Button */}
                <div class='relative w-full lg:w-3/4'>
                  <input
                    type='text'
                    placeholder='Search product'
                    class='w-full p-2 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 relative z-50'
                    aria-label='Search'
                    onFocus={() => props.setIsFocused(true)} // Set focus state
                    onBlur={() => props.setIsFocused(false)} // Reset focus state
                  />
                  <button
                    type='button'
                    class='absolute inset-y-0 right-2 flex items-center text-pink-500'
                    aria-label='Search'
                  >
                    <span class='material-symbols-outlined'>search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
