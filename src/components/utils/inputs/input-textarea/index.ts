import dynamic from 'next/dynamic';

import { NInputTextarea } from './input-textarea';

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

export const InputTextarea = dynamic<NInputTextarea.IProps>(
  import('./input-textarea').then((m) => m.InputTextarea)
);
