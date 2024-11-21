import { SVGIconSearchRight } from '@styles/global-icons/icons/svg-icon-search-right';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import { uuid } from '@utilsFn/uuid';
import React from 'react';
import styled from 'styled-components';

export const InputSearch = (props: NInputSearch.IProps) => {
  const { inputSize = 'medium' } = props;

  const id = React.useMemo(() => props?.id ?? uuid(), []);

  const totalCount = `0/${props?.totalCount}`;
  const placeholder = props?.placeholder || '';

  const isValue = props?.value ? 'input_search_activated' : '';

  const classNames = [inputSize, isValue];
  const inputId = joinClasses(id, props?.id, ...classNames);

  return (
    <ContainerInputSearch
      className={joinClasses(id, props?.classNameContainer, ...classNames)}
      style={props?.styleContainer}
    >
      <input
        {...omit(
          props,
          'classNameContainer',
          'styleContainer',
          'inputSize',
          'error',
          'totalCount',
          'onIconClick'
        )}
        id={inputId}
        className={joinClasses(id, props?.className, ...classNames)}
        type="text"
        placeholder={placeholder}
        value={props?.value}
      />
      <div
        className={joinClasses(id, 'input_search_icon_div', ...classNames)}
        onClick={props?.onIconClick}
      >
        <SVGIconSearchRight />
      </div>
      <div className={joinClasses(id, 'input_search_under_div', ...classNames)}>
        {!props?.totalCount ? null : <span>{totalCount}</span>}
        {!props?.error ? null : <p>{props?.error}</p>}
      </div>
    </ContainerInputSearch>
  );
};

export namespace NInputSearch {
  export type TInputSearchSize = 'medium';

  export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    classNameContainer?: string;
    styleContainer?: React.CSSProperties;
    inputSize?: TInputSearchSize;
    error?: string;
    totalCount?: number;
    value: string;
    onIconClick?: () => void;
  }
}

const ContainerInputSearch = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  > input {
    -webkit-appearance: none;
    border: none;
    width: 100%;
    outline: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey969};
    background-color: transparent;
    font-weight: normal;
    font-size: 13px;
    letter-spacing: 0px;
    transition: all 0.2s ease-out;
    color: ${({ theme }) => theme.colors.grey969};
    padding: 0 0 3px 0;
    ::placeholder {
      color: ${({ theme }) => theme.colors.grey969};
    }
    &.medium {
      height: 21px;
    }
    &.input_search_activated {
      color: ${({ theme }) => theme.colors.black000};
      border-bottom: 1px solid ${({ theme }) => theme.colors.blue44C};
      + .input_search_icon_div {
        > svg {
          > path {
            fill: ${({ theme }) => theme.colors.blue44C};
          }
        }
      }
    }
    :hover:enabled {
      border-bottom: 1px solid ${({ theme }) => theme.colors.black000};
      ::placeholder {
        color: ${({ theme }) => theme.colors.black000};
      }
      + .input_search_icon_div {
        > svg {
          > path {
            fill: ${({ theme }) => theme.colors.black000};
          }
        }
      }
    }
    :focus:enabled {
      color: ${({ theme }) => theme.colors.black000};
      border-bottom: 1px solid ${({ theme }) => theme.colors.blue44C};
      ::placeholder {
        color: ${({ theme }) => theme.colors.black000};
      }
      + .input_search_icon_div {
        > svg {
          > path {
            fill: ${({ theme }) => theme.colors.blue44C};
          }
        }
      }
    }
    :disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.greyC9C};
      border-bottom: 1px solid ${({ theme }) => theme.colors.greyC9C};
      ::placeholder {
        color: ${({ theme }) => theme.colors.greyC9C};
      }
      + .input_search_icon_div {
        cursor: not-allowed;
        > svg {
          > path {
            fill: ${({ theme }) => theme.colors.greyC9C};
          }
        }
      }
    }
  }
  .input_search_icon_div {
    width: 15px;
    min-width: 15px;
    height: 15px;
    min-height: 15px;
    display: flex;
    position: absolute;
    top: 3px;
    right: 0px;
    > svg {
      > path {
        fill: ${({ theme }) => theme.colors.grey969};
      }
    }
  }
  .input_search_under_div {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    > span {
      margin: 4px 4px 4px 0;
    }
    > p {
      margin: 4px 0;
      color: ${({ theme }) => theme.colors.redEF3};
    }
  }
`;
