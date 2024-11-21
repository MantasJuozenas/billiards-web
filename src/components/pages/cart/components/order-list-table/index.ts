import dynamic from 'next/dynamic';

export const OrderListTable = dynamic<any>(
  import('./order-list-table').then((m) => m.OrderListTable)
);
