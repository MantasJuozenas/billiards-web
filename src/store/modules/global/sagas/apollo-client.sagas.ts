// import { initializeApollo } from '@clients/apollo';
// import { put, select } from '@redux-saga/core/effects';
// import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';

// import { setApolloClient, setNewApolloClient } from '../actions';

// export function* apolloClientSaga(action: ReturnType<typeof setApolloClient>) {
//   try {
//     const state: G.IStore = yield select();
//     const { loggedInUser } = state.auth;

//     if (!action?.payload?.client) {
//       // eslint-disable-next-line prettier/prettier
//       const client: G.TApolloClient = yield initializeApollo({initialState: null, reState: loggedInUser?.id});
//       yield put(
//         setNewApolloClient({
//           mutate: client?.mutate,
//           query: client?.query,
//           resetStore: client?.resetStore,
//           stop: client?.stop
//         })
//       );
//     } else {
//       yield put(
//         setNewApolloClient({
//           mutate: action?.payload?.client?.mutate,
//           query: action?.payload?.client?.query,
//           resetStore: action?.payload?.client?.resetStore,
//           stop: action?.payload?.client?.stop
//         })
//       );
//     }
//   } catch (error: any) {
//     yield console.error('apolloClientSaga > ERROR:', error?.toString?.());
//   }
// }

// export const ApolloClientSaga = [
//   takeLatest(setApolloClient, lifecycleSaga(apolloClientSaga))
// ];
export {};
