import { SVGIconSortDesc } from '@styles/global-icons/icons/svg-icon-sort-desc';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import React from 'react';
import styled from 'styled-components';

export const HeaderSort = (props: NHeaderSort.IProps) => {
  const { order = 'asc' } = props;

  const classNames = [order, props?.isActive ? 'isActive' : ''];

  return (
    <ContainerHeaderSort
      className="_HeaderSort"
      {...(omit(props, 'order', 'label', 'onSortClick') as any)}
    >
      <label>{props?.label}</label>

      <div
        className={joinClasses('icon', ...classNames)}
        onClick={() => props?.onSortClick?.()}
      >
        <SVGIconSortDesc />
      </div>
    </ContainerHeaderSort>
  );
};

export namespace NHeaderSort {
  export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
    order?: 'asc' | 'desc';
    isActive?: boolean;
    onSortClick: () => void;
  }
}

const ContainerHeaderSort = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  label {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    color: ${({ theme }) => theme.colors.grey7B7};
  }
  div.icon {
    cursor: pointer;
    margin-left: 7px;
    &.asc {
      > svg {
        transform: rotate3d(1, 0, 0, 180deg);
      }
    }
    &.isActive {
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.aqua46E};
        }
      }
    }
  }
  @media print {
    white-space: normal;
    div.icon {
      display: none;
    }
    label {
      font-weight: bold !important;
    }
  }
`;
