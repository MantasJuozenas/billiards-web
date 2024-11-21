import dynamic from 'next/dynamic';

import { NInputCheckbox } from './input-checkbox';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r3">
 *   <Controller
 *     defaultValue
 *     name="rememberMe"
 *     control={control}
 *     render={({ field }) => (
 *       <InputCheckbox
 *         input={{
 *           ...(field as any),
 *           checked: field?.value,
 *           placeholder: t(`modals-and-forms:::FormLogin::text4`),
 *           onChange: (val) => {
 *             field?.onChange?.(val);
 *           }
 *         }}
 *       />
 *     )}
 *   />
 * </div>
 */

export const InputCheckbox = dynamic<NInputCheckbox.IProps>(
  import('./input-checkbox').then((m) => m.InputCheckbox)
);
