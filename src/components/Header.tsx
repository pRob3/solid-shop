import { A } from '@solidjs/router';
import { Show } from 'solid-js';
import { useCartContext } from '../context/CartContext';
import { useUserContext } from '../context/UserContext';
import HamburgerMenu from './HamburgerMenu';
import SearchBar from './SearchBar';

interface HeaderProps {
  setIsFocused: (value: boolean) => void; // Prop to update focus state in App
}

export default function Header(props: HeaderProps) {
  const { isLoggedIn, logout } = useUserContext();
  const { items } = useCartContext();
  const quantity = () => items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <header class='bg-white shadow-md border-b border-gray-300 top-0 z-40'>
        <div class='mx-auto grid md:grid-cols-2 lg:grid-cols-4'>
          {/* Logo and Mobile Menu Button */}
          <div class='order-1 col-span-1 lg:col-span-1 lg:order-1 flex items-center gap-1 justify-start relative'>
            <div class='px-4 py-2 flex items-center justify-between'>
              <div class='flex items-center gap-4'>
                {/* Hamburger Menu */}
                <HamburgerMenu />

                {/* Logo */}
                <A
                  href='/'
                  class='items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
                >
                  SolidShop
                </A>
              </div>
            </div>
          </div>

          {/* Actions (Cart, Login/Logout) */}
          <div class='order-2 col-span-1 lg:col-span-1 lg:order-3 flex items-center gap-6 justify-end relative z-10'>
            <A
              href='/store-locator'
              class='text-gray-600 dark:text-gray-900 flex items-center gap-1'
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
                  class='text-gray-600 dark:text-gray-900 flex items-center gap-1'
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
                class='text-gray-600 dark:text-gray-900 flex items-center gap-1'
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
              class='relative text-gray-600 dark:text-gray-900 flex items-center gap-1 mr-4'
            >
              <span class='relative flex items-center'>
                <span class='material-symbols-outlined'>shopping_cart</span>
                {quantity() > 0 && (
                  <span class='absolute -top-2 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                    {quantity()}
                  </span>
                )}
              </span>
              <span class='hidden lg:inline'>Cart</span>
            </A>
          </div>

          {/* Search Bar */}

          <div class='order-3 col-span-2 lg:col-span-2 lg:order-2 relative z-30'>
            <div class=' py-2 flex items-center justify-center'>
              <SearchBar setIsFocused={props.setIsFocused} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
