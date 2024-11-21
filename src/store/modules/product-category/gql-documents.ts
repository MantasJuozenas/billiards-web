import gql from 'graphql-tag';

export const UpsertProductCategoryGqlMutation = gql`
  mutation UpsertProductCategoryGqlMutation(
    $objectsUpsertProductCategory: [product_category_insert_input!]!
    $on_conflictUpsertProductCategory: product_category_on_conflict
  ) {
    insert_product_category(
      objects: $objectsUpsertProductCategory
      on_conflict: $on_conflictUpsertProductCategory
    ) {
      returning {
        id
      }
    }
  }
`;

export const InsertProductCategoryGqlMutation = gql`
  mutation InsertProductCategoryGqlMutation(
    $objectsInsertProductCategory: [product_category_insert_input!]!
  ) {
    insert_product_category(objects: $objectsInsertProductCategory) {
      returning {
        id
      }
    }
  }
`;

export const UpdateProductCategoryGqlMutation = gql`
  mutation UpdateProductCategoryGqlMutation(
    $whereUpdateProductCategory: product_category_bool_exp!
    $_setUpdateProductCategory: product_category_set_input
  ) {
    update_product_category(
      where: $whereUpdateProductCategory
      _set: $_setUpdateProductCategory
    ) {
      returning {
        id
      }
    }
  }
`;

export const DeleteProductCategoryGqlMutation = gql`
  mutation DeleteProductCategoryGqlMutation(
    $whereDeleteProductCategory: product_category_bool_exp!
  ) {
    delete_product_category(where: $whereDeleteProductCategory) {
      returning {
        id
      }
    }
  }
`;
