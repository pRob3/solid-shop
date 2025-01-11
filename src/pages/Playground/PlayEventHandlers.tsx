import { createSignal } from 'solid-js';

export default function PlayEventHandlers() {
  const [name, setName] = createSignal('Kurt Cobain');
  const [age, setAge] = createSignal(21);

  const ChangeName = (name: string) => {
    setName(name);
  };

  return (
    <div>
      <h1>Name is: {name()}</h1>
      <h2>Age: {age()}</h2>
      <button
        class='btn'
        type='button'
        onClick={() => ChangeName('Dave Grohl')}
      >
        Change Name
      </button>
      <input
        class='input'
        type='text'
        onInput={(e) => setName(e.target.value)}
        value={name()}
      />
    </div>
  );
}
