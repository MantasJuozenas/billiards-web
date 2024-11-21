import { joinClasses } from '@utilsFn/join-classes';
import React from 'react';
import { components, ValueContainerProps } from 'react-select';
import styled from 'styled-components';

const ValueContainer = (props: ValueContainerProps<any, boolean>) => {
  const placeholderClassNames = joinClasses('__Custom_Placeholder__');

  return (
    <>
      <ContainerValueContainer {...(props as any)} />

      <div className={placeholderClassNames}>
        {props?.selectProps?.placeholder || ''}
      </div>
    </>
  );
};

export default ValueContainer;

const ContainerValueContainer = styled(components.ValueContainer)``;
