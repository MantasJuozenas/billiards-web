import { IPermissions } from './types';

export const GetPermissionsGqlQuery = async (
  _props: NGetPermissionsGqlQuery.IProps
) => {
  const permissions = {} as IPermissions;

  return { permissions };
};

export namespace NGetPermissionsGqlQuery {
  export interface IProps {
    client: G.TClientAxiosApollo;
    userId: number;
  }

  export interface IReturn {
    permissions: IPermissions;
  }
}
