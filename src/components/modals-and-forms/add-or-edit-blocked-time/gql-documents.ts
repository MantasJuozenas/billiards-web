import { clientAxiosApollo } from '@clients/axios/client-axios-apollo';
import { axiosApolloEmitter } from '@clients/axios/client-axios-apollo/utils/refetch-emitter';
import {
  InsertBlockedTimeGqlMutation,
  UpdateBlockedTimeGqlMutation
} from '@store/modules/blocked-time/gql-documents';
import { setBlockedTimeData } from '@store/modules/modals-and-forms/actions';

export const AddOrEditBlockedTimeMutation = async (
  props: NAddOrEditBlockedTimeMutation.IProps
) => {
  const { mutationData, dispatch } = props;

  const client = clientAxiosApollo;

  try {
    const res = await (mutationData?.id
      ? client<
          GQL_gen.Queries.UpdateBlockedTimeGqlMutation,
          GQL_gen.Queries.UpdateBlockedTimeGqlMutationVariables
        >({
          query: UpdateBlockedTimeGqlMutation,
          variables: {
            whereUpdateBlockedTime: {
              id: { _eq: mutationData?.id }
            },
            _setUpdateBlockedTime: mutationData?.values
          }
        })
      : client<
          GQL_gen.Queries.InsertBlockedTimeGqlMutation,
          GQL_gen.Queries.InsertBlockedTimeGqlMutationVariables
        >({
          query: InsertBlockedTimeGqlMutation,
          variables: {
            objectsInsertBlockedTime: mutationData?.values
          }
        }));

    props.afterQueryDone?.({
      data:
        'insert_blocked_time' in res
          ? res?.insert_blocked_time
          : 'update_blocked_time' in res
          ? res?.update_blocked_time
          : undefined,
      action: 'insert_blocked_time' in res ? 'create' : 'edit'
    });

    props?.refetchQueries?.map((event) => axiosApolloEmitter.emit(event));
    dispatch(setBlockedTimeData({ openModalType: null }));
  } catch (error: any) {
    console.error(`AddOrEditBlockedTimeMutation`, error);
    props?.afterQueryError?.({
      error,
      action: mutationData?.id ? 'edit' : 'create'
    });
  }
};

export namespace NAddOrEditBlockedTimeMutation {
  export interface IProps
    extends G.IQMutationProps<NHandlers.IDoneProps, NHandlers.IErrorProps> {
    mutationData: {
      id?: number;
      values: GQL_gen.Queries.InsertBlockedTimeGqlMutationVariables['objectsInsertBlockedTime'];
    };
    toastStrings: G.IToastStrings;
  }
}

export const DeleteBlockedTimeMutation = async (
  props: NDeleteBlockedTimeMutation.IProps
) => {
  const { mutationData, dispatch } = props;

  const client = clientAxiosApollo;

  try {
    const res = await client<
      GQL_gen.Queries.UpdateBlockedTimeGqlMutation,
      GQL_gen.Queries.UpdateBlockedTimeGqlMutationVariables
    >({
      query: UpdateBlockedTimeGqlMutation,
      variables: {
        whereUpdateBlockedTime: {
          id: { _eq: mutationData.id }
        },
        _setUpdateBlockedTime: {
          deleted_at: new Date()
        }
      }
    });

    if (res?.update_blocked_time?.affected_rows) {
      props.afterQueryDone?.({
        data: res?.update_blocked_time,
        action: 'delete'
      });
    }

    props.refetchQueries?.map((event) => axiosApolloEmitter.emit(event));
    dispatch(setBlockedTimeData({ openModalType: null }));
  } catch (error: any) {
    console.error(`DeleteBlockedTimeMutation`, error);
    props.afterQueryError?.({ error, action: 'delete' });
  }
};

export namespace NDeleteBlockedTimeMutation {
  export interface IProps
    extends G.IQMutationProps<NHandlers.IDoneProps, NHandlers.IErrorProps> {
    mutationData: {
      id: number;
    };
    toastStrings: G.IToastStrings;
  }
}

export namespace NHandlers {
  export interface IDoneProps {
    data:
      | GQL_gen.Queries.InsertBlockedTimeGqlMutation['insert_blocked_time']
      | GQL_gen.Queries.UpdateBlockedTimeGqlMutation['update_blocked_time']
      | GQL_gen.Queries.DeleteBlockedTimeGqlMutation['delete_blocked_time'];
    action: G.TOpenModalTypes;
  }

  export interface IErrorProps {
    error: Error;
    action: G.TOpenModalTypes;
  }
}
