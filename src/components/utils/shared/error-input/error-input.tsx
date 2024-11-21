import React from 'react';
import styled from 'styled-components';

export const ErrorInput = (props: NErrorInput.IProps) => {
  if (!props?.msgError) return <></>;

  return (
    <ContainerErrorInput>
      <p>{props?.msgError}</p>
    </ContainerErrorInput>
  );
};

export namespace NErrorInput {
  export interface IProps {
    msgError?: React.ReactNode;
  }
}

const ContainerErrorInput = styled.div`
  --colorError: #df0303;

  margin-top: 4px;
  margin-left: 15px;

  p {
    margin: 0;

    font: normal normal medium 14px/24px Roboto;
    letter-spacing: 0.11px;
    color: var(--colorError);
  }
`;
