import gql from 'graphql-tag';

export const UpsertGroupGqlMutation = gql`
  mutation UpsertGroupGqlMutation(
    $objectsUpsertGroup: [group_insert_input!]!
    $on_conflictUpsertGroup: group_on_conflict
  ) {
    insert_group(
      objects: $objectsUpsertGroup
      on_conflict: $on_conflictUpsertGroup
    ) {
      returning {
        id
      }
    }
  }
`;

export const InsertGroupGqlMutation = gql`
  mutation InsertGroupGqlMutation($objectsInsertGroup: [group_insert_input!]!) {
    insert_group(objects: $objectsInsertGroup) {
      returning {
        id
      }
    }
  }
`;

export const UpdateGroupGqlMutation = gql`
  mutation UpdateGroupGqlMutation(
    $whereUpdateGroup: group_bool_exp!
    $_setUpdateGroup: group_set_input
  ) {
    update_group(where: $whereUpdateGroup, _set: $_setUpdateGroup) {
      returning {
        id
      }
    }
  }
`;

export const DeleteGroupGqlMutation = gql`
  mutation DeleteGroupGqlMutation($whereDeleteGroup: group_bool_exp!) {
    delete_group(where: $whereDeleteGroup) {
      returning {
        id
      }
    }
  }
`;
