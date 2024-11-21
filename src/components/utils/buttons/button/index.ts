import dynamic from 'next/dynamic';

import { NButton } from './button';

/**
 * @example
 * <Button>Test</Button>
 *
 * <Button iconPlacement="left">
 *   <SVGIconRedX />
 *   Test
 * </Button>
 *
 * <Button
 *   iconPlacement="left"
 *   btnHeight={35}
 *   btnType="text"
 *   isLoading
 * >
 *   <SVGIconRedX />
 *   Test
 * </Button>
 */

export const Button = dynamic<NButton.IProps>(
  import('./button').then((m) => m.Button)
);
