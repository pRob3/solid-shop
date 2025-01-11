import type { JSX } from 'solid-js';
import Header from './components/Header';

interface AppProps {
  children: JSX.Element | JSX.Element[];
}

function App(props: AppProps) {
  return (
    <div class='container m-auto'>
      <Header />

      {props.children}
    </div>
  );
}

export default App;
