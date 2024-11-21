import gql from 'graphql-tag';

export const UpsertOrderGqlMutation = gql`
  mutation UpsertOrderGqlMutation(
    $objectsUpsertOrder: [order_insert_input!]!
    $on_conflictUpsertOrder: order_on_conflict
  ) {
    insert_order(
      objects: $objectsUpsertOrder
      on_conflict: $on_conflictUpsertOrder
    ) {
      returning {
        id
      }
    }
  }
`;

export const InsertOrderGqlMutation = gql`
  mutation InsertOrderGqlMutation($objectsInsertOrder: [order_insert_input!]!) {
    insert_order(objects: $objectsInsertOrder) {
      returning {
        id
      }
    }
  }
`;

export const UpdateOrderGqlMutation = gql`
  mutation UpdateOrderGqlMutation(
    $whereUpdateOrder: order_bool_exp!
    $_setUpdateOrder: order_set_input
  ) {
    update_order(where: $whereUpdateOrder, _set: $_setUpdateOrder) {
      returning {
        id
      }
    }
  }
`;

export const DeleteOrderGqlMutation = gql`
  mutation DeleteOrderGqlMutation($whereDeleteOrder: order_bool_exp!) {
    delete_order(where: $whereDeleteOrder) {
      returning {
        id
      }
    }
  }
`;
