import gql from 'graphql-tag';

export const InsertBlockedTimeGqlMutation = gql`
  mutation InsertBlockedTimeGqlMutation(
    $objectsInsertBlockedTime: [blocked_time_insert_input!]!
  ) {
    insert_blocked_time(objects: $objectsInsertBlockedTime) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const UpdateBlockedTimeGqlMutation = gql`
  mutation UpdateBlockedTimeGqlMutation(
    $whereUpdateBlockedTime: blocked_time_bool_exp!
    $_setUpdateBlockedTime: blocked_time_set_input!
  ) {
    update_blocked_time(
      where: $whereUpdateBlockedTime
      _set: $_setUpdateBlockedTime
    ) {
      affected_rows
    }
  }
`;

export const DeleteBlockedTimeGqlMutation = gql`
  mutation DeleteBlockedTimeGqlMutation(
    $whereDeleteBlockedTime: blocked_time_bool_exp!
  ) {
    delete_blocked_time(where: $whereDeleteBlockedTime) {
      affected_rows
    }
  }
`;
