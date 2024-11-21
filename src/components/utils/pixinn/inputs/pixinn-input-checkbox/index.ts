import dynamic from 'next/dynamic';

import { NPixinnInputCheckbox } from './pixinn-input-checkbox';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r3">
 *   <Controller
 *     defaultValue
 *     name="rememberMe"
 *     control={control}
 *     render={({ field }) => (
 *       <PixinnInputCheckbox
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

export const PixinnInputCheckbox = dynamic<NPixinnInputCheckbox.IProps>(
  import('./pixinn-input-checkbox').then((m) => m.PixinnInputCheckbox)
);
