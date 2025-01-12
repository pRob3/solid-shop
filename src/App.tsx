import { createSignal, type JSX } from 'solid-js';
import Header from './components/Header';

interface AppProps {
  children: JSX.Element | JSX.Element[];
}

function App(props: AppProps) {
  const [isFocused, setIsFocused] = createSignal(false);

  return (
    <div class='relative'>
      {/* Dimmed Background */}
      <div
        class={`absolute inset-0 bg-black bg-opacity-20 ${
          isFocused() ? 'block' : 'hidden'
        } z-20`}
      />

      {/* Header */}
      <div class='relative'>
        <Header setIsFocused={setIsFocused} />
      </div>

      {/* Main Content */}
      <div class='relative z-0'>{props.children}</div>
    </div>
  );
}

export default App;
