import { useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import styled from 'styled-components';

export const FormConfirmation = () => {
  const confirmation = useSelector((s) => s.modalsAndForms.confirmation);

  return (
    <ContainerFormConfirmation id="FormConfirmation">
      {confirmation?.component || null}
    </ContainerFormConfirmation>
  );
};

const ContainerFormConfirmation = styled.div``;
