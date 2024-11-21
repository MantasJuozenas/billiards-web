import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector
} from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useAppDispatch<any>();
export const useSelector: TypedUseSelectorHook<G.IStore> = useAppSelector;
