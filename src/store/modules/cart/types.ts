export interface IState {
  orderIsLoading: boolean;
  cartItems: {
    dbProductId: number;
    product: G.IStore['menu']['menuList']['products'][''];
    price: number;
    quantity: number;
    totalAmount: number;
    modifiers: G.IStore['modalsAndForms']['menuItem']['modifiers'];
  }[];
  totalCount: number;
  totalAmount: number;
}

export type TSetAuthState = Omit<IState, 'authCheckComplete' | 'permissions'>;

export const defaultState: IState = {
  orderIsLoading: false,
  cartItems: [],
  totalCount: 0,
  totalAmount: 0
};
