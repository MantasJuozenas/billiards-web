import dynamic from 'next/dynamic';

import { NInputAsyncCreatableSelect } from './input-async-creatable-select';
import { NInputAsyncSelect } from './input-async-select';
import { NInputCreatableSelect } from './input-creatable-select';
import { NInputSelect } from './input-select';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r4">
 *   <Controller
 *     name="username"
 *     control={control}
 *     render={({ field }) => (
 *       <InputSelect
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

export const InputSelect = dynamic<NInputSelect.IProps>(
  import('./input-select').then((m) => m.InputSelect)
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
 *     <InputAsyncSelect
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

export const InputAsyncSelect = dynamic<NInputAsyncSelect.IProps>(
  import('./input-async-select').then((m) => m.InputAsyncSelect)
);

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r4">
 *   <Controller
 *     name="username"
 *     control={control}
 *     render={({ field }) => (
 *       <InputCreatableSelect
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

export const InputCreatableSelect = dynamic<NInputCreatableSelect.IProps>(
  import('./input-creatable-select').then((m) => m.InputCreatableSelect)
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
 *     <InputAsyncCreatableSelect
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

export const InputAsyncCreatableSelect =
  dynamic<NInputAsyncCreatableSelect.IProps>(
    import('./input-async-creatable-select').then(
      (m) => m.InputAsyncCreatableSelect
    )
  );
