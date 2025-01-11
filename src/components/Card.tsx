import type { JSX } from "solid-js/jsx-runtime";


interface CardProps {
  rounded?: boolean;
  flat?: boolean;
  children : JSX.Element;
}

export default function Card(props: CardProps) {
  return (
    <div class="bg-white p-4 text-center"
     classList={{ 'rounded-md': props.rounded, 'shadow-md': !props.flat }}>
      {props.children}
    </div>
  );
}