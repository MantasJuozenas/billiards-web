import dynamic from 'next/dynamic';

export const OrderList = dynamic<any>(
  import('./order-list').then((m) => m.OrderList)
);
