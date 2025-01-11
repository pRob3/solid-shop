import type { Component, JSX } from 'solid-js';

interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  error?: () => string | undefined; // Reactive error passed as a function
  label: string;
}

const FormInput: Component<FormInputProps> = ({
  id,
  type,
  value,
  onInput,
  error,
  label,
}) => {
  return (
    <div class='mb-4'>
      <label for={id} class='block mb-1'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onInput={onInput}
        class='w-full p-2 border rounded'
      />
      {error?.() && <p class='text-red-500 text-sm'>{error()}</p>}
    </div>
  );
};

export default FormInput;
