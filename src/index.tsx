/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { Route, Router } from '@solidjs/router';
import Home from './pages/Home';
import { createSignal, type ParentComponent } from 'solid-js';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import PlayEventHandlers from './pages/Playground/PlayEventHandlers';
import PlaySignals from './pages/Playground/PlaySignals';
import PlayStores from './pages/Playground/PlayStores';
import PlayEffects from './pages/Playground/PlayEffects';
import LoginPage from './pages/auth/Login';
import Register from './pages/auth/Register';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import ProductPage from './pages/ProductPage';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

const App: ParentComponent = (props) => {
  return (
    <div class='container m-auto'>
      <Header />
      {props.children}
    </div>
  );
};

render(
  () => (
    <UserProvider>
      <CartProvider>
        <Router base='/solid-shop' root={App}>
          <Route path='/' component={Home} />

          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={Register} />

          <Route path='/cart' component={Cart} />
          <Route path='/product/:id' component={ProductPage} />

          <Route
            path='/playground/eventHandlers'
            component={PlayEventHandlers}
          />
          <Route path='/playground/signals' component={PlaySignals} />
          <Route path='/playground/stores' component={PlayStores} />
          <Route path='/playground/effects' component={PlayEffects} />

          <Route path='*paramName' component={NotFound} />
        </Router>
      </CartProvider>
    </UserProvider>
  ),
  // biome-ignore lint/style/noNonNullAssertion: Throws above if it doesn't exist
  root!
);
