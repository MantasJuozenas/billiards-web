import { _, media } from '@utilsFn/breakpoint';
import styled from 'styled-components';

export const StylePageDivCenter = styled.div`
  width: 100%;
  max-width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
  padding: 0 var(--pagePaddingSide);
  margin-right: auto;
  margin-left: auto;
  background-color: transparent;

  ${_(media.max.tablet)} {
    width: 100%;
    padding: 0;
  }
`;
