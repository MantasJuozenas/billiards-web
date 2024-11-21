import dynamic from 'next/dynamic';

import { NPixinnButton } from './pixinn-button';

/**
 * @example
 * <PixinnButton>Test</PixinnButton>
 *
 * <PixinnButton iconPlacement="left">
 *   <SVGIconRedX />
 *   Test
 * </PixinnButton>
 *
 * <PixinnButton
 *   iconPlacement="left"
 *   btnHeight={35}
 *   btnType="text"
 *   isLoading
 * >
 *   <SVGIconRedX />
 *   Test
 * </PixinnButton>
 */

export const PixinnButton = dynamic<NPixinnButton.IProps>(
  import('./pixinn-button').then((m) => m.PixinnButton)
);
