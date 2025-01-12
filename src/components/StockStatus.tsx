interface StockStatusProps {
  stock: number;
}

export default function StockStatus(props: { stock: number }) {
  const getStatus = () => {
    if (props.stock > 0) {
      return props.stock < 5
        ? { text: 'Low stock', color: 'text-yellow-500', icon: 'warning' }
        : { text: 'In stock', color: 'text-green-500', icon: 'check_circle' };
    }

    return { text: 'Out of stock', color: 'text-red-500', icon: 'cancel' };
  };

  const status = getStatus();

  return (
    <p class={`text-sm flex items-center gap-1 ${status.color}`}>
      <span class='material-symbols-outlined'>{status.icon}</span>
      {status.text}
    </p>
  );
}
