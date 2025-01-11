import { createSignal, type JSX } from 'solid-js';
import Header from './components/Header';

interface AppProps {
  children: JSX.Element | JSX.Element[];
}

function App(props: AppProps) {
  const [isFocused, setIsFocused] = createSignal(false);

  return (
    <div class='container m-auto'>
      {/* Dimmed Background */}
      <div
        class={`absolute inset-0 bg-black bg-opacity-50 ${
          isFocused() ? 'block' : 'hidden'
        } z-20`}
      >
        {' '}
      </div>
      <Header setIsFocused={setIsFocused} />

      {props.children}
    </div>
  );
}

export default App;
