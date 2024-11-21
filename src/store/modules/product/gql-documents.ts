import gql from 'graphql-tag';

export const UpsertProductGqlMutation = gql`
  mutation UpsertProductGqlMutation(
    $objectsUpsertProduct: [product_insert_input!]!
    $on_conflictUpsertProduct: product_on_conflict
  ) {
    insert_product(
      objects: $objectsUpsertProduct
      on_conflict: $on_conflictUpsertProduct
    ) {
      returning {
        id
      }
    }
  }
`;

export const InsertProductGqlMutation = gql`
  mutation InsertProductGqlMutation(
    $objectsInsertProduct: [product_insert_input!]!
  ) {
    insert_product(objects: $objectsInsertProduct) {
      returning {
        id
      }
    }
  }
`;

export const UpdateProductGqlMutation = gql`
  mutation UpdateProductGqlMutation(
    $whereUpdateProduct: product_bool_exp!
    $_setUpdateProduct: product_set_input
  ) {
    update_product(where: $whereUpdateProduct, _set: $_setUpdateProduct) {
      returning {
        id
      }
    }
  }
`;

export const DeleteProductGqlMutation = gql`
  mutation DeleteProductGqlMutation($whereDeleteProduct: product_bool_exp!) {
    delete_product(where: $whereDeleteProduct) {
      returning {
        id
      }
    }
  }
`;
