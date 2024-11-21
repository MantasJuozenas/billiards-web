import axios from 'axios';

import { IIKO_API_LOGIN, IIKO_API_URL } from '../../backend-constants';

export const clientAxiosIiko = async () => {
  const accessToken = await axios
    .post(
      '/access_token',
      { apiLogin: IIKO_API_LOGIN },
      { baseURL: IIKO_API_URL }
    )
    .then((resToken) => {
      return resToken?.data?.token;
    });

  return axios.create({
    baseURL: IIKO_API_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
};
