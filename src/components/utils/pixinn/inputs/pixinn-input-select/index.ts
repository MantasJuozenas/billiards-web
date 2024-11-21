import dynamic from 'next/dynamic';

import { NPixinnInputAsyncCreatableSelect } from './pixinn-input-async-creatable-select';
import { NPixinnInputAsyncSelect } from './pixinn-input-async-select';
import { NPixinnInputCreatableSelect } from './pixinn-input-creatable-select';
import { NPixinnInputSelect } from './pixinn-input-select';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r4">
 *   <Controller
 *     name="username"
 *     control={control}
 *     render={({ field }) => (
 *       <PixinnInputSelect
 *         select={{
 *           ...field,
 *           placeholder: 'Label',
 *           value: select,
 *           options: [
 *             { value: 1, label: 1 },
 *             { value: 2, label: 2 }
 *           ],
 *           onChange: (val) => {
 *             setSelect(() => val);
 *             field?.onChange?.(val?.value);
 *           }
 *         }}
 *       />
 *     )}
 *   />
 * </div>;
 */

export const PixinnInputSelect = dynamic<NPixinnInputSelect.IProps>(
  import('./pixinn-input-select').then((m) => m.PixinnInputSelect)
);

/**
 * @example
 * with react-hook-form
 * const AsyncSelectGqlQuery = gql`
 *   query AsyncSelectGqlQuery($where: public_test_bool_exp) {
 *     public_test(where: $where) {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * const usersOnLoad = useRequestQuery<
 *   GQL_gen.Queries.AsyncSelectGqlQuery,
 *   GQL_gen.Queries.AsyncSelectGqlQueryVariables
 * >({ query: AsyncSelectGqlQuery, variables: {} });
 *
 * <div className="FormLogin_r4">
 *  <Controller
 *   name="username"
 *   control={control}
 *   render={({ field }) => (
 *     <PixinnInputAsyncSelect
 *       select={{
 *         ...field,
 *         placeholder: 'Label',
 *         defaultOptions: true,
 *         loadOptions: async () => {
 *           const rollData = await usersOnLoad();
 *
 *           return rollData?.public_test?.map?.((item) => {
 *             return {
 *               value: item?.id,
 *               label: item?.name
 *             };
 *           });
 *         },
 *         value: select,
 *         onChange: (val) => {
 *           setSelect(() => val);
 *           field?.onChange?.(val?.value);
 *         }
 *       }}
 *       msgError={errors?.username?.message || ''}
 *     />
 *   )}
 * />
 */

export const PixinnInputAsyncSelect = dynamic<NPixinnInputAsyncSelect.IProps>(
  import('./pixinn-input-async-select').then((m) => m.PixinnInputAsyncSelect)
);

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r4">
 *   <Controller
 *     name="username"
 *     control={control}
 *     render={({ field }) => (
 *       <PixinnInputCreatableSelect
 *         select={{
 *           ...field,
 *           placeholder: 'Label',
 *           value: select,
 *           options: [
 *             { value: 1, label: 1 },
 *             { value: 2, label: 2 }
 *           ],
 *           onChange: (val) => {
 *             setSelect(() => val);
 *             field?.onChange?.(val?.value);
 *           }
 *         }}
 *         msgError={errors?.username?.message || ''}
 *       />
 *     )}
 *   />
 * </div>;
 */

export const PixinnInputCreatableSelect =
  dynamic<NPixinnInputCreatableSelect.IProps>(
    import('./pixinn-input-creatable-select').then(
      (m) => m.PixinnInputCreatableSelect
    )
  );

/**
 * @example
 * with react-hook-form
 * const AsyncSelectGqlQuery = gql`
 *   query AsyncSelectGqlQuery($where: public_test_bool_exp) {
 *     public_test(where: $where) {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * const usersOnLoad = useRequestQuery<
 *   GQL_gen.Queries.AsyncSelectGqlQuery,
 *   GQL_gen.Queries.AsyncSelectGqlQueryVariables
 * >({ query: AsyncSelectGqlQuery, variables: {} });
 *
 * <div className="FormLogin_r4">
 * <Controller
 *   name="username"
 *   control={control}
 *   render={({ field }) => (
 *     <PixinnInputAsyncCreatableSelect
 *       select={{
 *         ...field,
 *         placeholder: 'Label',
 *         defaultOptions: true,
 *         loadOptions: async () => {
 *           const rollData = await usersOnLoad();
 *
 *           return rollData?.public_test?.map?.((item) => {
 *             return {
 *               value: item?.id,
 *               label: item?.name
 *             };
 *           });
 *         },
 *         value: select,
 *         onChange: (val) => {
 *           setSelect(() => val);
 *           field?.onChange?.(val?.value);
 *         }
 *       }}
 *       msgError={errors?.username?.message || ''}
 *     />
 *   )}
 * />
 */

export const PixinnInputAsyncCreatableSelect =
  dynamic<NPixinnInputAsyncCreatableSelect.IProps>(
    import('./pixinn-input-async-creatable-select').then(
      (m) => m.PixinnInputAsyncCreatableSelect
    )
  );
