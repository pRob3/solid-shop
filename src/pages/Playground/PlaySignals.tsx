import { createSignal } from 'solid-js';

export default function PlaySignals() {
  const [name, setName] = createSignal('Kurt Cobain');
  const [bool, setBool] = createSignal(true);
  const [age, setAge] = createSignal(21);

  setTimeout(() => {
    setName('Dave Grohl');
  }, 100);

  setTimeout(() => {
    // setName('Dave Grohl');
    // setBool(!bool());
    setBool((prev) => !prev);
  }, 2000);

  setInterval(() => {
    setAge(age() + 1);
  }, 1000);

  const [person, setPerson] = createSignal({
    name: {
      first: 'Kurt',
      last: 'Cobain',
    },
    age: 21,
  });

  setTimeout(() => {
    setPerson({
      name: {
        first: 'Kurt',
        last: 'Olsson',
      },
      age: 21,
    });
  }, 3000);

  return (
    <div>
      <p>
        The name is {name()} and the age is {age()}
      </p>
      <p>Bool is {bool().toString()}</p>

      <p>
        The name is {person().name.first} {person().name.last}
      </p>
    </div>
  );
}
