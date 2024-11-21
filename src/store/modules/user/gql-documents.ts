import gql from 'graphql-tag';

export const AddUserGqlMutation = gql`
  mutation AddUserGqlMutation($objectsAddUser: [user_insert_input!]!) {
    insert_user(objects: $objectsAddUser) {
      returning {
        id
      }
    }
  }
`;

export const EditUserGqlMutation = gql`
  mutation EditUserGqlMutation(
    $whereEditUser: user_bool_exp!
    $_setEditUser: user_set_input
  ) {
    update_user(where: $whereEditUser, _set: $_setEditUser) {
      returning {
        id
      }
    }
  }
`;

export const DeleteUserGqlMutation = gql`
  mutation DeleteUserGqlMutation($whereDeleteUser: user_bool_exp!) {
    delete_user(where: $whereDeleteUser) {
      returning {
        id
      }
    }
  }
`;
