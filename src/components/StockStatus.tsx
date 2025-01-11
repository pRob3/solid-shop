interface StockStatusProps {
  stock: number;
}

export default function StockStatus(props: StockStatusProps) {
  const getStatusText = () => {
    if (props.stock > 0) {
      return props.stock < 5 ? 'Low stock' : 'In stock';
    }
    return 'Out of stock';
  };

  const getStatusColor = () => {
    if (props.stock > 0) {
      return props.stock < 5 ? 'text-yellow-500' : 'text-green-500';
    }
    return 'text-red-500';
  };

  const getStatusIcon = () => {
    if (props.stock > 0) {
      return props.stock < 5 ? 'warning' : 'check_circle';
    }
    return 'cancel';
  };

  return (
    <p
      class={`text-xs font-medium ${getStatusColor()} flex items-center justify-center gap-1`}
    >
      <span class='material-symbols-outlined text-sm'>{getStatusIcon()}</span>
      {getStatusText()}
    </p>
  );
}
