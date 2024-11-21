import { isBrowser } from './check-browser';

export const LocalStorage = () => {
  let localSTORAGE: Storage;
  if (isBrowser()) localSTORAGE = localStorage;
  // @ts-ignore
  return localSTORAGE;
};
