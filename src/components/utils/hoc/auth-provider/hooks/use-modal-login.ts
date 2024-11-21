// import { useEffect } from '@cHooks/use-effect';
// import { useDispatch, useSelector } from '@cHooks/use-selector';
// import { RemoveLocaleStorageLoginStorage } from '@cStore/modules/local-storage/functions/login-storage';
// import { GetUrlParam } from '@gUtils/client/url-params';
// import { useRouter } from 'next/router';

// import { NAuthProvider } from '../auth-provider';
// import { HandlerModalLogin } from '../functions/handler-modal-login';

// export const useModalLogin = (props: NUseModalLogin.TProps) => {
//   const router = useRouter();

//   const params = props?.params;

//   const paramEmail = GetUrlParam(params, 'email').value;
//   const paramName = GetUrlParam(params, 'name').value;
//   const paramSurname = GetUrlParam(params, 'surname').value;
//   const paramLcns = GetUrlParam(params, 'lcns')
//     .value as NAuthProvider.TParams['lcns'];
//   const paramRPAL = GetUrlParam(params, 'rPAL').value;
//   const paramSId = GetUrlParam(params, 'sId').value;

//   const dispatch = useDispatch();
//   const authCheckComplete = useSelector((s) => s.auth.authCheckComplete);

//   useEffect({
//     effect: () => {
//       if (!authCheckComplete) return;
//       if (!paramLcns) {
//         RemoveLocaleStorageLoginStorage();
//         return;
//       }

//       HandlerModalLogin({
//         router,
//         dispatch,
//         email: paramEmail,
//         name: paramName,
//         surname: paramSurname,
//         lcns: paramLcns,
//         rPAL: paramRPAL,
//         sId: paramSId
//       });
//     },
//     deps: [authCheckComplete, paramLcns]
//   });
// };

// export namespace NUseModalLogin {
//   export type TProps = {
//     params: NAuthProvider.TParams;
//   };
// }
export {};
