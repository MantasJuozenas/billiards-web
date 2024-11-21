import dynamic from 'next/dynamic';

import { NInput } from './input';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r2">
 *   <Input
 *     input={{
 *       placeholder: t(`modals-and-forms:::FormLogin::text3`),
 *       type: 'password',
 *       ...register('password')
 *     }}
 *     msgError={errors?.password?.message || ''}
 *   />
 * </div>
 */

export const Input = dynamic<NInput.IProps>(
  import('./input').then((m) => m.Input)
);
