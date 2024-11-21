import { GQL_ADMIN_SECRET } from '@api/utils/backend-constants';
import { axiosApolloQueryClientBase } from '@clients/axios/client-axios-apollo/utils/client-base';
import { GQL_API_URL } from '@constants/app-constants';
import axios from 'axios';

const GetClientAxiosApolloAdmin = () => {
  return axios.create({
    baseURL: GQL_API_URL,
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      // 1. JWT authentication is enforced when the X-Hasura-Admin-Secret header is not found in the request.
      // 2. JWT authentication is skipped when the X-Hasura-Admin-Secret header is found in the request and admin access is granted.
      'x-hasura-admin-secret': GQL_ADMIN_SECRET
    }
  });
};

export const clientAxiosApolloAdmin = axiosApolloQueryClientBase(
  GetClientAxiosApolloAdmin
);
