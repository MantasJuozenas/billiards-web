import { med } from '@utilsFn/breakpoint';
import styled from 'styled-components';

export const StylePageSidePanelInLayout = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 100%;
    max-width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    padding: 0 var(--pagePaddingSide);
    padding-left: calc(var(--pagePaddingSide) + var(--sidePanelWidth) - 1px);
  }

  /* ${med.max.tablet} {
    > div {
      padding: 0;
      padding-left: 0;
    }
  } */
`;
