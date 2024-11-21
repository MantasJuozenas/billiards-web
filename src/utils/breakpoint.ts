/* eslint-disable @typescript-eslint/no-use-before-define */
import { EBreakpoint } from '@typings/custom/enum-custom';
import { BaseThemedCssFunction, css } from 'styled-components';

interface IBreakpoint {
  min?: number | null;
  max?: number | null;
}
interface IDefaultBreakpoint extends IBreakpoint {
  breakpoint: EBreakpoint;
}

export const BREAKPOINTS: IDefaultBreakpoint[] = [
  {
    breakpoint: EBreakpoint.ExtraSmall,
    min: null,
    max: 414
  },
  {
    breakpoint: EBreakpoint.Small,
    min: 414,
    max: 768
  },
  {
    breakpoint: EBreakpoint.Tablet,
    min: 768,
    max: 1024
  },
  {
    breakpoint: EBreakpoint.Medium,
    min: 1024,
    max: 1280
  },
  {
    breakpoint: EBreakpoint.Large,
    min: 1280,
    max: 1600
  },
  {
    breakpoint: EBreakpoint.ExtraLarge,
    min: 1600,
    max: null
  }
];

export const BreakpointsDict = {
  extraSmall: {
    breakpoint: EBreakpoint.ExtraSmall,
    min: null,
    max: 414
  },
  small: {
    breakpoint: EBreakpoint.Small,
    min: 414,
    max: 768
  },
  tablet: {
    breakpoint: EBreakpoint.Tablet,
    min: 768,
    max: 1024
  },
  medium: {
    breakpoint: EBreakpoint.Medium,
    min: 1024,
    max: 1279
  },
  large: {
    breakpoint: EBreakpoint.Large,
    min: 1280,
    max: 1600
  },
  extraLarge: {
    breakpoint: EBreakpoint.ExtraLarge,
    min: 1600,
    max: null
  }
};

const minMaxMediaCss =
  ({ min, max }: IBreakpoint): BaseThemedCssFunction<any> =>
  (first: any, ...interpolations: any[]) => {
    if (!min || !max) {
      throw new Error('Exact media creator must get both min and max values');
    }
    return css`
      @media ${`(min-width: ${min}px) and (max-width: ${max}px)`} {
        ${(css as any)(first, ...interpolations)};
      }
    `;
  };

const minMediaCss =
  ({ min }: IBreakpoint): BaseThemedCssFunction<any> =>
  (first: any, ...interpolations: any[]) => {
    if (!min) {
      throw new Error('Min media creator must get min value');
    }
    return css`
      @media ${`(min-width: ${min}px)`} {
        ${(css as any)(first, ...interpolations)};
      }
    `;
  };

const maxMediaCss =
  ({ max }: IBreakpoint): BaseThemedCssFunction<any> =>
  (first: any, ...interpolations: any[]) => {
    if (!max) {
      throw new Error('Max media creator must get max value');
    }
    return css`
      @media ${`(max-width: ${max}px)`} {
        ${(css as any)(first, ...interpolations)};
      }
    `;
  };

const createMediaCss =
  (mode: 'exact' | 'min' | 'max') => (breakpoint: EBreakpoint) => {
    const result = BREAKPOINTS.find((point) => point.breakpoint === breakpoint);

    if (!result) {
      throw new Error(
        `Failed to match breakpoint ${breakpoint}, make sure you pass correct enum value`
      );
    }

    const { max, min } = result;

    if (mode === 'min') {
      if (!min) {
        throw new Error(
          `Breakpoint "${result.breakpoint}" cannot be used with "min" mode`
        );
      }

      return minMediaCss(result);
    }

    if (mode === 'max') {
      if (!max) {
        throw new Error(
          `Breakpoint "${result.breakpoint}" cannot be used with "max" mode`
        );
      }

      return maxMediaCss(result);
    }

    if (min && !max) {
      return minMediaCss(result);
    }

    if (!min && max) {
      return maxMediaCss(result);
    }

    return minMaxMediaCss(result);
  };

const createExactMediaCss = createMediaCss('exact');
const createMinMediaCss = createMediaCss('min');
const createMaxMediaCss = createMediaCss('max');

export const media = {
  xs: createExactMediaCss(EBreakpoint.ExtraSmall),
  sm: createExactMediaCss(EBreakpoint.Small),
  tablet: createExactMediaCss(EBreakpoint.Tablet),
  md: createExactMediaCss(EBreakpoint.Medium),
  lg: createExactMediaCss(EBreakpoint.Large),
  xlg: createExactMediaCss(EBreakpoint.ExtraLarge),
  custom: (breakpoint: { min: number; max: number }) =>
    minMaxMediaCss(breakpoint as any),
  min: {
    sm: createMinMediaCss(EBreakpoint.Small),
    tablet: createMinMediaCss(EBreakpoint.Tablet),
    md: createMinMediaCss(EBreakpoint.Medium),
    lg: createMinMediaCss(EBreakpoint.Large),
    xlg: createMinMediaCss(EBreakpoint.ExtraLarge),
    custom: (min: number) => minMediaCss({ min })
  },
  max: {
    xs: createMaxMediaCss(EBreakpoint.ExtraSmall),
    sm: createMaxMediaCss(EBreakpoint.Small),
    tablet: createMaxMediaCss(EBreakpoint.Tablet),
    md: createMaxMediaCss(EBreakpoint.Medium),
    lg: createMaxMediaCss(EBreakpoint.Large),
    custom: (max: number) => maxMediaCss({ max })
  }
};

/** Media with already applied transformation */
export const med = {
  xs: _(media.xs),
  sm: _(media.sm),
  tablet: _(media.tablet),
  md: _(media.md),
  lg: _(media.lg),
  xlg: _(media.xlg),
  custom: (...args: Parameters<typeof media['custom']>) =>
    _(media.custom(...args)),
  min: {
    sm: _(media.min.sm),
    tablet: _(media.min.tablet),
    md: _(media.min.md),
    lg: _(media.min.lg),
    xlg: _(media.min.xlg),
    custom: (...args: Parameters<typeof media['min']['custom']>) =>
      _(media.min.custom(...args))
  },
  max: {
    xs: _(media.max.xs),
    sm: _(media.max.sm),
    tablet: _(media.max.tablet),
    md: _(media.max.md),
    lg: _(media.max.lg),
    custom: (...args: Parameters<typeof media['max']['custom']>) =>
      _(media.max.custom(...args))
  }
};
export function _(m: BaseThemedCssFunction<any>): any {
  return m``.slice(0, 2);
}

export const matchBreakpoint = ({
  min,
  max
}: {
  min: number | null;
  max: number | null;
}): boolean => {
  if (min && max) {
    return window.matchMedia(`(min-width: ${min}px) and (max-width: ${max}px)`)
      .matches;
  }

  if (min && !max) {
    return window.matchMedia(`(min-width: ${min}px)`).matches;
  }

  if (!min && max) {
    return window.matchMedia(`(max-width: ${max}px)`).matches;
  }

  console.error('`min` or `max` was not provided to match breakpoint', {
    min,
    max
  });

  return false;
};

export const getBreakpoint = (): EBreakpoint => {
  const result = BREAKPOINTS.find((point: any) => matchBreakpoint(point));

  if (!result) {
    console.error(
      'Failed to detect device breakpoint, fallbacking to extra small'
    );

    return EBreakpoint.ExtraSmall;
  }

  return result.breakpoint;
};
