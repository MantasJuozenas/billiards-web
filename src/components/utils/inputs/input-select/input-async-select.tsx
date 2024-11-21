import { ErrorInput } from '@components/utils/shared/error-input';
import { isBrowser } from '@utilsFn/check-browser';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import React from 'react';
import ReactAsyncSelect, { AsyncProps } from 'react-select/async';
import styled from 'styled-components';

import MenuContainer from './components/menu-container';
import MenuListContainer from './components/menu-list-container';
import ValueContainer from './components/value-container';

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

export const InputAsyncSelect = (props: NInputAsyncSelect.IProps) => {
  const classNames = [props?.select?.isDisabled ? 'isDisabled' : '']?.filter?.(
    (v) => v
  );

  return (
    <ContainerInputAsyncSelect className={joinClasses(``, ...classNames)}>
      <ReactAsyncSelect
        {...omit(
          props?.select,
          'className',
          'classNamePrefix',
          'onMenuOpen',
          'components',
          props?.menuPortalTargetBody ? 'menuPortalTarget' : ('' as any)
        )}
        className={joinClasses(
          `InputAsyncSelect`,
          props?.select?.className || '',
          ...classNames
        )}
        classNamePrefix={joinClasses(`InputAsyncSelectPrefix`)}
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
    </ContainerInputAsyncSelect>
  );
};

export namespace NInputAsyncSelect {
  export type TSelect = AsyncProps<any, any, any>;

  export interface IProps {
    select: TSelect;
    scrollIntoView?: boolean;
    msgError?: React.ReactNode;
    menuPortalTargetBody?: boolean;
    customMenuListTopItem?: React.ReactNode;
    customMenuListBottomItem?: React.ReactNode;
  }
}

const ContainerInputAsyncSelect = styled.div`
  --height: 56px;
  --paddingTop: 25px;
  --paddingRight: 18px;
  --paddingBottom: 7px;
  --paddingLeft: 18px;
  --colorFocus: #00b8ff;
  --borderRadius: 4px;
  --border: inset 0 0 0 1px transparent;
  --borderHover: inset 0 0 0 1px #c0ecfd;
  --borderFocus: inset 0 0 0 1px var(--colorFocus);
  --borderError: inset 0 0 0 1px var(--colorError);
  --transition: 0.4s ease all;

  .InputAsyncSelectPrefix__control {
    cursor: pointer;
    min-height: var(--height);
    box-shadow: none;
    border-radius: var(--borderRadius);
    border: none;
    box-shadow: var(--border);
    background-color: #fafafa;
  }

  .InputAsyncSelectPrefix__control--is-focused {
    box-shadow: var(--borderFocus);
    background-color: #ffffff;
  }

  .InputAsyncSelectPrefix__value-container {
    margin: 0;
    padding: 0 var(--paddingRight) 0 var(--paddingLeft);
    min-height: var(--height);
  }

  .InputAsyncSelectPrefix__single-value {
    padding: var(--paddingTop) 0 var(--paddingBottom) 0;

    font: normal normal 600 16px/24px Open sans;
    letter-spacing: 0px;
    color: #000000;
  }

  .InputAsyncSelectPrefix__placeholder {
    display: none;
  }

  .__Custom_Placeholder__ {
    position: absolute;
    left: var(--paddingLeft);
    top: 16px;

    font: normal normal normal 16px/24px Open sans;
    letter-spacing: 0px;
    color: #767676;

    transition: var(--transition);
  }

  .InputAsyncSelectPrefix__input-container {
    margin: 0;
    padding: var(--paddingTop) 0 var(--paddingBottom) 0;

    font: normal normal 600 16px/24px Open sans;
    letter-spacing: 0px;
    color: #000000;
  }

  .InputAsyncSelectPrefix__menu {
    margin: 9px 0;
    border-radius: 8px;
    border: 1px solid #cecece;
    background-color: #ffffff;
  }

  .InputAsyncSelectPrefix__menu-list {
    padding: 10px;
  }

  .InputAsyncSelectPrefix__option {
    cursor: pointer;
    padding: 9.5px 16px;
    border-radius: 8px;

    font: normal normal 600 16px/21px Open sans;
    letter-spacing: 0px;
    color: #767676;

    :not(:last-child) {
      margin-bottom: 2px;
    }
  }

  .InputAsyncSelectPrefix__option--is-focused {
    background-color: #fafafa;
  }

  .InputAsyncSelectPrefix__option--is-selected {
    background-color: #effaff;

    color: #009bd6;
  }

  // hover
  .InputAsyncSelectPrefix__control:hover {
    box-shadow: var(--borderHover);

    .__Custom_Placeholder__ {
      color: #000000;
    }
  }

  .InputAsyncSelectPrefix__control--is-focused,
  .InputAsyncSelectPrefix__control--is-focused:hover {
    box-shadow: var(--borderFocus);
    background-color: #ffffff;

    .__Custom_Placeholder__ {
      top: 6px;

      font: normal normal normal 14px/24px Open sans;
      letter-spacing: 0px;
      color: #00b8ff;
    }
  }

  // has value
  .InputAsyncSelectPrefix__value-container--has-value
    ~ .__Custom_Placeholder__ {
    top: 6px;

    font: normal normal normal 14px/24px Open sans;
    letter-spacing: 0px;
  }

  // disabled
  &.isDisabled {
    cursor: not-allowed;

    .InputAsyncSelectPrefix__single-value,
    .__Custom_Placeholder__ {
      color: #b3b3b3;
    }
  }
`;
