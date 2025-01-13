import { createSignal } from 'solid-js';
import toast from 'solid-toast';

interface SearchBarProps {
  setIsFocused: (value: boolean) => void; // Prop to update focus state in App
}

const messages = [
  'Wow much search! 🚀',
  'Searching for treasures! 🏴‍☠️',
  'Finding the best deals! 💸',
  'Hold on, magic is happening! ✨',
  'Your wish is our command! 🧞‍♂️',
  'Uncovering hidden gems! 💎',
  'Shopping spree initiated! 🛍️',
  'Hang tight, deals are coming! ⏳',
  'Your search is our mission! 🚀',
  'Bringing the best to you! 🎁',
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

export default function SearchBar(props: SearchBarProps) {
  const [searchValue, setSearchValue] = createSignal('');
  const [placeholder, setPlaceholder] = createSignal('Search product');

  const handleSearch = () => {
    if (searchValue().trim() !== '') {
      toast.success(getRandomMessage());
      console.log('Searching for:', searchValue()); // Perform your search logic here
    }
  };

  return (
    <div class='relative w-full mr-5 ml-5 lg:w-4/5 focus-within:scale-105 transform transition-all duration-200'>
      <input
        type='text'
        placeholder={placeholder()}
        value={searchValue()}
        onInput={(e) => setSearchValue(e.currentTarget.value)} // Update the search value
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }} // Handle search on Enter key press
        class='w-full pl-4 pr-14 p-2 rounded-full border 
        border-gray-200
        dark:border-gray-200
        bg-gray-200
        dark:bg-gray-100
        text-black 
        placeholder-gray-400 
        dark:placeholder-gray-400 
        focus:border-gray-100 
        dark:focus:border-gray-200 
        focus:bg-white 
        dark:focus:bg-white 
        focus:ring-0 
        focus:ring-gray-600 
        focus:outline-none 
        transition-colors 
        duration-200 
        relative 
        z-50'
        aria-label='Search'
        onFocus={() => {
          props.setIsFocused(true);
          setPlaceholder('Search product and press Enter');
        }} // Set focus state and change placeholder
        onBlur={() => {
          props.setIsFocused(false);
          setPlaceholder('Search product...');
        }} // Reset focus state and placeholder
      />
      <button
        type='button'
        class='absolute inset-y-0 right-2 flex items-center text-pink-500 z-30 transition-transform duration-200 active:scale-125'
        aria-label='Search'
        onClick={handleSearch}
      >
        <span class='material-symbols-outlined'>search</span>
      </button>
    </div>
  );
}
