import { ELocation } from '@components/modals-and-forms/forms-interfaces';
import { NGetMenuList } from '@pages/api/iiko/functions/get-menu-list';
import * as Schema from './schema';

export * from './schema';

// #region Base extends
export interface Json_Comparison_Exp<T extends Record<string, any> = Schema.Scalars['json']>
  extends Schema.Json_Comparison_Exp {
  _eq?: InputMaybe<T>;
  _gt?: InputMaybe<T>;
  _gte?: InputMaybe<T>;
  _in?: InputMaybe<Array<T>>;
  _lt?: InputMaybe<T>;
  _lte?: InputMaybe<T>;
  _neq?: InputMaybe<T>;
  _nin?: InputMaybe<Array<T>>;
}
export interface Jsonb_Comparison_Exp<T extends Record<string, any> = Schema.Scalars['jsonb']>
  extends Omit<Schema.Jsonb_Comparison_Exp, '_has_key' | '_has_keys_all' | '_has_keys_any'> {
  /** is the column contained in the given json value */
  _contained_in?: Schema.InputMaybe<T>;
  /** does the column contain the given json value at the top level */
  _contains?: Schema.InputMaybe<import('type-fest').PartialDeep<T>>;
  _eq?: Schema.InputMaybe<T>;
  _gt?: Schema.InputMaybe<T>;
  _gte?: Schema.InputMaybe<T>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Schema.InputMaybe<keyof T>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Schema.InputMaybe<Array<keyof T>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Schema.InputMaybe<Array<keyof T>>;
  _in?: Schema.InputMaybe<T[]>;
  _lt?: Schema.InputMaybe<T>;
  _lte?: Schema.InputMaybe<T>;
  _neq?: Schema.InputMaybe<T>;
  _nin?: Schema.InputMaybe<T[]>;
}
// #endregion

export interface User extends Schema.User {
  role_id: GQLEnums.ERoles;
}

export interface Reservation extends Schema.Reservation {
  type: GQLEnums.EReservationType
}

export interface Group extends Schema.Group {
  ikos_group_json?: { group: NGetMenuList.TGroups }
}

export interface Product extends Schema.Product {
  ikos_product_json?: { product: NGetMenuList.TProducts }
}

export interface Blocked_Time_Insert_Input extends Schema.Blocked_Time_Insert_Input {
	location: Schema.InputMaybe<ELocation>
}
