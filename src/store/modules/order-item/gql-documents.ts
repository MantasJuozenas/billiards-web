import gql from 'graphql-tag';

export const UpsertOrderItemGqlMutation = gql`
  mutation UpsertOrderItemGqlMutation(
    $objectsUpsertOrderItem: [order_item_insert_input!]!
    $on_conflictUpsertOrderItem: order_item_on_conflict
  ) {
    insert_order_item(
      objects: $objectsUpsertOrderItem
      on_conflict: $on_conflictUpsertOrderItem
    ) {
      returning {
        id
      }
    }
  }
`;

export const InsertOrderItemGqlMutation = gql`
  mutation InsertOrderItemGqlMutation(
    $objectsInsertOrderItem: [order_item_insert_input!]!
  ) {
    insert_order_item(objects: $objectsInsertOrderItem) {
      returning {
        id
      }
    }
  }
`;

export const UpdateOrderItemGqlMutation = gql`
  mutation UpdateOrderItemGqlMutation(
    $whereUpdateOrderItem: order_item_bool_exp!
    $_setUpdateOrderItem: order_item_set_input
  ) {
    update_order_item(
      where: $whereUpdateOrderItem
      _set: $_setUpdateOrderItem
    ) {
      returning {
        id
      }
    }
  }
`;

export const DeleteOrderItemGqlMutation = gql`
  mutation DeleteOrderItemGqlMutation(
    $whereDeleteOrderItem: order_item_bool_exp!
  ) {
    delete_order_item(where: $whereDeleteOrderItem) {
      returning {
        id
      }
    }
  }
`;
