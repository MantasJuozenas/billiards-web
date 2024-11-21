import dynamic from 'next/dynamic';

import { NPixinnInput2 } from './pixinn-input-2';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r2">
 *   <PixinnInput2
 *     input={{
 *       placeholder: t(`modals-and-forms:::FormLogin::text3`),
 *       type: 'password',
 *       ...register('password')
 *     }}
 *     msgError={errors?.password?.message || ''}
 *   />
 * </div>
 */

export const PixinnInput2 = dynamic<NPixinnInput2.IProps>(
  import('./pixinn-input-2').then((m) => m.PixinnInput2)
);
