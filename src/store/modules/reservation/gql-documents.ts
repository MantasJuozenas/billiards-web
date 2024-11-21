import gql from 'graphql-tag';

export const AddReservationGqlMutation = gql`
  mutation AddReservationGqlMutation(
    $objectsAddReservation: [reservation_insert_input!]!
  ) {
    insert_reservation(objects: $objectsAddReservation) {
      returning {
        id
      }
    }
  }
`;

export const EditReservationGqlMutation = gql`
  mutation EditReservationGqlMutation(
    $whereEditReservation: reservation_bool_exp!
    $_setEditReservation: reservation_set_input
  ) {
    update_reservation(
      where: $whereEditReservation
      _set: $_setEditReservation
    ) {
      returning {
        id
      }
    }
  }
`;

export const DeleteReservationGqlMutation = gql`
  mutation DeleteReservationGqlMutation(
    $whereDeleteReservation: reservation_bool_exp!
  ) {
    delete_reservation(where: $whereDeleteReservation) {
      returning {
        id
      }
    }
  }
`;
