import dynamic from 'next/dynamic';

export const OrderDetails = dynamic<any>(
  import('./order-details').then((m) => m.OrderDetails)
);
