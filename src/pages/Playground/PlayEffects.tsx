import { createEffect, createSignal, For } from 'solid-js';
import { createStore } from 'solid-js/store';

export default function PlayEffects() {
  const [count, setCount] = createSignal(0);

  const [person, setPerson] = createStore({
    name: {
      first: 'Kurt',
      last: 'Cobain',
    },
    age: 21,
  });

  function changeName() {
    setPerson('name', 'last', 'Olsson');
  }

  const [producs, setProducts] = createStore([
    {
      id: 1,
      title: 'Product 1',
      price: 100,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
    },
    {
      id: 3,
      title: 'Product 3',
      price: 300,
    },
  ]);

  function changeProduct(id: number) {
    // setProducts(0, 'title', 'New Name');
    setProducts((p) => p.id === id, 'title', 'New Name');
  }

  // const int = setInterval(() => setCount(count() + 1), 1000);

  // createEffect(() => {
  //   console.log('The count is', count());

  //   if (count() >= 5) {
  //     clearInterval(int);
  //   }
  // });

  createEffect(() => {
    console.log(person.name.last);
  });

  return (
    <div>
      <div class='mb-5'>
        <p>The count is {count()}</p>
        <p>The name is {person.name.first}</p>
        <p>The name is {person.name.last}</p>

        <button class='btn' type='button' onClick={changeName}>
          Change the last name
        </button>
      </div>

      <div>
        <strong>Products</strong>
        <For each={producs}>
          {(product) => (
            <div>
              <p>{product.title}</p>
              <p>${product.price}</p>
            </div>
          )}
        </For>

        <button class='btn' type='button' onClick={() => changeProduct(2)}>
          Change product
        </button>
      </div>
    </div>
  );
}
