import { ErrorInput } from '@components/utils/shared/error-input';
import { isBrowser } from '@utilsFn/check-browser';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import React from 'react';
import ReactSelect, { Props } from 'react-select';
import styled from 'styled-components';

import MenuContainer from './components/menu-container';
import MenuListContainer from './components/menu-list-container';
import ValueContainer from './components/value-container';

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
 *         msgError={errors?.username?.message || ''}
 *       />
 *     )}
 *   />
 * </div>;
 */

export const InputSelect = (props: NInputSelect.IProps) => {
  const { floatingLabel = true } = props;

  const classNames = [
    props?.select?.isDisabled ? 'isDisabled' : '',
    floatingLabel ? 'floatingLabel' : ''
  ]?.filter?.((v) => v);

  return (
    <ContainerInputSelect
      className={joinClasses(``, ...classNames)}
      selectHeight={props?.selectHeight || 56}
    >
      <ReactSelect
        {...omit(
          props?.select,
          'className',
          'classNamePrefix',
          'onMenuOpen',
          'components',
          props?.menuPortalTargetBody ? 'menuPortalTarget' : ('' as any)
        )}
        className={joinClasses(
          `InputSelect`,
          props?.select?.className || '',
          ...classNames
        )}
        classNamePrefix={joinClasses(`InputSelectPrefix`)}
        // styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={
          isBrowser() && props?.menuPortalTargetBody ? document.body : null
        }
        onMenuOpen={() => {
          if (props?.scrollIntoView) {
            const doc = document.getElementById(props?.select?.id || '');

            if (doc) {
              setTimeout(() => {
                doc?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }
          props?.select?.onMenuOpen?.();
        }}
        components={{
          ValueContainer,
          Menu: MenuContainer,
          MenuList: MenuListContainer,
          ...props?.select?.components
        }}
        // custom props that gets all components via props?.selectProps
        // customMenuListTopItem={props?.customMenuListTopItem}
        // customMenuListBottomItem={props?.customMenuListBottomItem}
      />

      <ErrorInput msgError={props?.msgError} />
    </ContainerInputSelect>
  );
};

export namespace NInputSelect {
  export type TSelect = Props;

  export interface IProps {
    select: TSelect;
    selectHeight?: 56 | 45;
    floatingLabel?: boolean;
    scrollIntoView?: boolean;
    msgError?: React.ReactNode;
    menuPortalTargetBody?: boolean;
    customMenuListTopItem?: React.ReactNode;
    customMenuListBottomItem?: React.ReactNode;
  }

  export interface IStyle {
    selectHeight: number;
  }
}

const ContainerInputSelect = styled.div<NInputSelect.IStyle>`
  --height: ${(props) => props?.selectHeight}px;
  --paddingTop: 25px;
  --paddingRight: 15px;
  --paddingBottom: 7px;
  --paddingLeft: 15px;
  --colorFocus: #ff0055;
  --borderRadius: 4px;
  --border: inset 0 0 0 1px transparent;
  --borderHover: inset 0 0 0 1px #ff0055;
  --borderFocus: inset 0 0 0 1px var(--colorFocus);
  --borderError: inset 0 0 0 1px var(--colorError);
  --transition: 0.4s ease all;

  width: 100%;

  &.floatingLabel {
    .InputSelectPrefix__control {
      cursor: pointer;
      min-height: var(--height);
      box-shadow: none;
      border-radius: var(--borderRadius);
      border: none;
      box-shadow: var(--border);
      background-color: #292929;
    }

    .InputSelectPrefix__value-container {
      margin: 0;
      padding: 0 var(--paddingRight) 0 var(--paddingLeft);
      min-height: var(--height);
    }

    .InputSelectPrefix__single-value {
      padding: var(--paddingTop) 0 var(--paddingBottom) 0;

      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.13px;
      color: #ffffff;
    }

    .InputSelectPrefix__placeholder {
      display: none;
    }

    .__Custom_Placeholder__ {
      position: absolute;
      left: var(--paddingLeft);
      top: 16px;

      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.13px;
      color: #a9a9a9;

      transition: var(--transition);
    }

    .InputSelectPrefix__input-container {
      margin: 0;
      padding: var(--paddingTop) 0 var(--paddingBottom) 0;

      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.13px;
      color: #ffffff;
    }

    .InputSelectPrefix__indicator-separator {
      display: none;
    }

    .InputSelectPrefix__indicator {
      svg {
        path {
          fill: #a9a9a9;
        }
      }
    }

    .InputSelectPrefix__menu {
      margin: 2px 0;
      border-radius: 4px;
      border: none;
      background-color: #383838;
    }

    .InputSelectPrefix__menu-list {
      max-height: 210px;
      padding: 0;
    }

    .InputSelectPrefix__option {
      cursor: pointer;
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-radius: 0;

      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.13px;
      color: #ffffff;

      /* :not(:last-child) {
        margin-bottom: 2px;
      } */
    }

    .InputSelectPrefix__option--is-focused {
      background-color: #ff0055;
    }

    .InputSelectPrefix__option--is-selected {
      background-color: #ff0055;

      color: #ffffff;
    }

    // hover
    .InputSelectPrefix__control:hover {
      box-shadow: var(--borderHover);

      .__Custom_Placeholder__ {
        color: #ffffff;
      }

      .InputSelectPrefix__indicator {
        svg {
          path {
            fill: #ff0055;
          }
        }
      }
    }

    .InputSelectPrefix__control--is-focused,
    .InputSelectPrefix__control--is-focused:hover {
      box-shadow: var(--borderFocus);
      background-color: #383838;

      .__Custom_Placeholder__ {
        top: 7px;

        font: normal normal normal 14px/24px Roboto;
        letter-spacing: 0.13px;
        color: #a9a9a9;
      }

      .InputSelectPrefix__indicator {
        svg {
          path {
            fill: #ff0055;
          }
        }
      }
    }

    .InputSelectPrefix__control--menu-is-open {
      .InputSelectPrefix__indicator {
        transform: rotate(180deg);

        svg {
          path {
            fill: #ff0055;
          }
        }
      }
    }

    // has value
    .InputSelectPrefix__value-container--has-value ~ .__Custom_Placeholder__ {
      display: absolute;
      top: 7px;

      font: normal normal normal 14px/24px Roboto;
      letter-spacing: 0.13px;
      color: #a9a9a9;
    }

    // disabled
    &.isDisabled {
      cursor: not-allowed;

      .InputSelectPrefix__single-value,
      .__Custom_Placeholder__ {
        color: #b3b3b3;
      }
    }
  }

  :not(&.floatingLabel) {
    .__Custom_Placeholder__ {
      display: none;
    }

    .InputSelectPrefix__indicator-separator {
      display: none;
    }

    .InputSelectPrefix__control {
      cursor: pointer;
      min-height: var(--height);
      box-shadow: none;
      border-radius: var(--borderRadius);
      border: none;
      box-shadow: var(--border);
      background-color: #292929;
    }

    .InputSelectPrefix__value-container {
      margin: 0;
      padding: 0 var(--paddingRight) 0 var(--paddingLeft);
      min-height: var(--height);
    }

    .InputSelectPrefix__placeholder {
      margin: 0;

      font: normal normal normal 16px/16px Roboto;
      letter-spacing: 0.13px;
      color: #a9a9a9;
    }

    .InputSelectPrefix__single-value {
      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.13px;
      color: #ffffff;
    }

    .InputSelectPrefix__input-container {
      margin: 0;

      font: normal normal normal 16px/16px Roboto;
      letter-spacing: 0.13px;
      color: #ffffff;
    }

    .InputSelectPrefix__indicator {
      svg {
        path {
          fill: #a9a9a9;
        }
      }
    }

    .InputSelectPrefix__menu {
      margin: 2px 0;
      border-radius: 4px;
      border: none;
      background-color: #383838;
    }

    .InputSelectPrefix__menu-list {
      max-height: 210px;
      padding: 0;
    }

    .InputSelectPrefix__option {
      cursor: pointer;
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-radius: 0;

      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.13px;
      color: #ffffff;

      /* :not(:last-child) {
        margin-bottom: 2px;
      } */
    }

    .InputSelectPrefix__option--is-focused {
      background-color: #ff0055;
    }

    .InputSelectPrefix__option--is-selected {
      background-color: #ff0055;

      color: #ffffff;
    }

    // hover
    .InputSelectPrefix__control:hover {
      box-shadow: var(--borderHover);

      .InputSelectPrefix__placeholder {
        color: #ffffff;
      }

      .InputSelectPrefix__indicator {
        svg {
          path {
            fill: #ff0055;
          }
        }
      }
    }

    .InputSelectPrefix__control--is-focused,
    .InputSelectPrefix__control--is-focused:hover {
      box-shadow: var(--borderFocus);
      background-color: #383838;

      .InputSelectPrefix__placeholder {
        color: #ffffff;
      }

      .InputSelectPrefix__indicator {
        svg {
          path {
            fill: #ff0055;
          }
        }
      }
    }

    .InputSelectPrefix__control--menu-is-open {
      .InputSelectPrefix__indicator {
        transform: rotate(180deg);

        svg {
          path {
            fill: #ff0055;
          }
        }
      }
    }

    // disabled
    &.isDisabled {
      cursor: not-allowed;

      .InputSelectPrefix__single-value,
      .__Custom_Placeholder__ {
        color: #b3b3b3;
      }
    }
  }
`;
