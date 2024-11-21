import gql from 'graphql-tag';

export const AddTokenGqlMutation = gql`
  mutation AddTokenGqlMutation($objectsAddToken: [token_insert_input!]!) {
    insert_token(objects: $objectsAddToken) {
      returning {
        id
      }
    }
  }
`;

export const EditTokenGqlMutation = gql`
  mutation EditTokenGqlMutation(
    $whereEditToken: token_bool_exp!
    $_setEditToken: token_set_input
  ) {
    update_token(where: $whereEditToken, _set: $_setEditToken) {
      returning {
        id
      }
    }
  }
`;

export const DeleteTokenGqlMutation = gql`
  mutation DeleteTokenGqlMutation($whereDeleteToken: token_bool_exp!) {
    delete_token(where: $whereDeleteToken) {
      returning {
        id
      }
    }
  }
`;
