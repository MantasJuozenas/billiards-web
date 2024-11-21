import { clientAxiosApollo } from '@clients/axios/client-axios-apollo';
import { IClientProps } from '@clients/axios/client-axios-apollo/utils/client-base';

export function useRequestQuery<Q, V>(
  clientProps: IClientProps & { variables: V }
) {
  const client = clientAxiosApollo;

  return () => {
    return new Promise<Q>((resolve, reject) => {
      client(clientProps)
        .then((res) => resolve(res as any))
        .catch((err) => reject(err));
    });
  };
}
