/* eslint-disable sonarjs/no-duplicate-string */
import { ERoles } from '@typings/graphql/enum-schema';

export const GetHasuraAuth = (props: NGetHasuraAuth.IProps) => {
  const hasuraAuth: G.IHasuraAuth = {
    'x-hasura-allowed-roles': ['public'],
    'x-hasura-default-role': 'public'
  };

  if (!props?.userId || !props?.userRoleId) return { hasuraAuth };

  hasuraAuth['x-hasura-user-id'] = props?.userId;

  if (props?.userRoleId === ERoles.user) {
    hasuraAuth['x-hasura-default-role'] = 'user';
    hasuraAuth['x-hasura-allowed-roles']?.push?.('user');
  }

  if (props?.userRoleId === ERoles.administrator) {
    hasuraAuth['x-hasura-default-role'] = 'administrator';
    hasuraAuth['x-hasura-allowed-roles']?.push?.('administrator');
  }

  if (props?.userRoleId === ERoles.admin) {
    hasuraAuth['x-hasura-default-role'] = 'super-admin';
    hasuraAuth['x-hasura-allowed-roles']?.push?.('super-admin');
  }

  return { hasuraAuth };
};

export namespace NGetHasuraAuth {
  export interface IProps {
    userId: string;
    userRoleId: ERoles | null;
  }
}
