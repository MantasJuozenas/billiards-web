/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-await-in-loop */
import { AddOrderItems } from '@pages/api/iiko/functions/add-order-items';
import { CreateOrder } from '@pages/api/iiko/functions/create-order';
import { GetOrdersByTable } from '@pages/api/iiko/functions/get-orders-by-table';
import { InitOrderByTable } from '@pages/api/iiko/functions/init-order-by-table';
import { clientAxiosApolloAdmin } from '@pages/api/utils/clients/axios/client-axios-apollo-admin';
import { assertServer } from '@pages/api/utils/functions/assert-server';
import { onErrorOk } from '@pages/api/utils/functions/on-error';
import { sRes } from '@pages/api/utils/functions/safe-res';
import { InsertOrderGqlMutation } from '@store/modules/order/gql-documents';
import { InsertOrderItemGqlMutation } from '@store/modules/order-item/gql-documents';
import { delay } from '@utilsFn/delay';
import { toArray } from '@utilsFn/dictionary';
import gql from 'graphql-tag';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

const handlerCreateAnOrder = nc<G.TNextApiRequest, G.TNextApiResponse>({
  onError: onErrorOk
});

const GetOrderIdGqlQuery = gql`
  query GetOrderIdGqlQuery($whereOrder: order_bool_exp) {
    order(where: $whereOrder, limit: 1) {
      id
    }
  }
`;

handlerCreateAnOrder.post<G.IExtendedRequest>(async (req, res, _next) => {
  const body = req?.body as NHandlerCreateAnOrder.IBody;

  try {
    const client = clientAxiosApolloAdmin;

    const ordersByTable = await GetOrdersByTable({
      location: body?.location,
      table: body?.table
    });

    let existingOrderId = ordersByTable?.orders?.[0]?.id;

    if (!existingOrderId) {
      await InitOrderByTable({
        location: body?.location,
        table: body?.table
      });

      for (let i = 0; i < 10; i++) {
        await delay(2000);

        const { orders } = await GetOrdersByTable({
          location: body?.location,
          table: body?.table
        });

        if (orders?.[0]?.id) {
          existingOrderId = orders[0].id;
          break;
        }
      }
    }

    if (existingOrderId) {
      const resAddOrderItems = await AddOrderItems({
        location: body?.location,
        orderId: existingOrderId,
        orderItems: body?.cartItems?.map?.((item) => {
          const productData = item?.product?.ikos_product_json?.product;
          const modifiers = toArray(item?.modifiers || {});

          return {
            productId: productData?.id || '',
            type: (productData?.orderItemType || '') as any,
            price: item?.price,
            amount: `${item?.quantity}`,
            comment: `Staliukas ${body?.table}`,
            modifiers: modifiers?.length ? modifiers : null
          };
        })
      });

      if (!resAddOrderItems?.correlationId) {
        const resData: NHandlerCreateAnOrder.TRes = {
          status: 'error',
          error: {
            msg: `!resAddOrderItems?.correlationId`,
            status: StatusCodes.INTERNAL_SERVER_ERROR
          }
        };

        return sRes(res, StatusCodes.INTERNAL_SERVER_ERROR, resData);
      }

      const { order } = await client<
        GQL_gen.Queries.GetOrderIdGqlQuery,
        GQL_gen.Queries.GetOrderIdGqlQueryVariables
      >({
        query: GetOrderIdGqlQuery,
        variables: {
          whereOrder: { ikos_order_id: { _eq: existingOrderId } }
        }
      });

      if (order?.[0]?.id) {
        await client<
          GQL_gen.Queries.InsertOrderItemGqlMutation,
          GQL_gen.Queries.InsertOrderItemGqlMutationVariables
        >({
          query: InsertOrderItemGqlMutation,
          variables: {
            objectsInsertOrderItem: body?.cartItems?.map?.((item) => {
              return {
                product_id: item?.dbProductId,
                order_id: order[0].id,
                price: item?.price,
                amount: +(item?.quantity || 0),
                ikos_product_id: item?.product?.ikko_id,
                modifiers_json: item?.modifiers
              };
            })
          }
        });
      }

      const resData: NHandlerCreateAnOrder.TRes = {
        status: 'ok',
        payload: { done: true }
      };

      return sRes(res, StatusCodes.OK, resData);
    }

    const resCreateOrder = await CreateOrder({
      location: body?.location,
      table: body?.table,
      orderItems: body?.cartItems?.map?.((item) => {
        const productData = item?.product?.ikos_product_json?.product;
        const modifiers = toArray(item?.modifiers || {});

        return {
          productId: productData?.id || '',
          type: (productData?.orderItemType || '') as any,
          amount: `${item?.quantity}`,
          comment: `Staliukas ${body?.table}`,
          modifiers: modifiers?.length ? modifiers : null
        };
      })
    });

    if (!resCreateOrder?.orderInfo?.id) {
      const resData: NHandlerCreateAnOrder.TRes = {
        status: 'error',
        error: {
          msg: `!resCreateOrder?.orderInfo?.id`,
          status: StatusCodes.INTERNAL_SERVER_ERROR
        }
      };

      return sRes(res, StatusCodes.INTERNAL_SERVER_ERROR, resData);
    }

    await client<
      GQL_gen.Queries.InsertOrderGqlMutation,
      GQL_gen.Queries.InsertOrderGqlMutationVariables
    >({
      query: InsertOrderGqlMutation,
      variables: {
        objectsInsertOrder: {
          full_name: body?.fullName,
          table_number: `${body?.table}`,
          phone: body?.phone,
          card_number: body?.cardNumber,
          sum: body?.totalAmount || 0,
          ikos_json: resCreateOrder,
          ikos_order_id: resCreateOrder?.orderInfo?.id,
          location: body?.location,
          OrderItems: {
            data: body?.cartItems?.map?.((item) => {
              // const productData = item?.product?.ikos_product_json?.product;

              return {
                price: item?.price,
                amount: +(item?.quantity || 0),
                ikos_product_id: item?.product?.ikko_id,
                product_id: item?.dbProductId,
                modifiers_json: item?.modifiers
              };
            })
          }
        }
      }
    });

    const resData: NHandlerCreateAnOrder.TRes = {
      status: 'ok',
      payload: { done: true }
    };

    return sRes(res, StatusCodes.OK, resData);
  } catch (error: any) {
    console.error(`NHandlerCreateAnOrder > ERROR:`, { error });
    assertServer(false, error?.status, error);
  }
});

export default handlerCreateAnOrder;

export namespace NHandlerCreateAnOrder {
  export interface IBody {
    cartItems: G.IStore['cart']['cartItems'];
    totalAmount: number;
    fullName: string;
    table: string;
    phone: string;
    cardNumber: string;
    location: GQLEnums.ELocation;
  }

  export type TPayload = { done: boolean };

  export type TRes = G.TApiRes<TPayload>;
}
