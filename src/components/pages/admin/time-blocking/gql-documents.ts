import gql from 'graphql-tag';

export const GetBlockedTimeGqlQuery = gql`
  query GetBlockedTimeGqlQuery(
    $whereBlockedTime: blocked_time_bool_exp = {}
    $limitBlockedTime: Int
    $offsetBlockedTime: Int
    $orderByBlockedTime: [blocked_time_order_by!]
  ) {
    blocked_time(
      where: $whereBlockedTime
      limit: $limitBlockedTime
      offset: $offsetBlockedTime
      order_by: $orderByBlockedTime
    ) {
      all_day
      dart
      date_number
      id
      pool
      time_from
      time_to
      location
    }
  }
`;
