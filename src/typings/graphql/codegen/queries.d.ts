import * as Types from './extended-schema';

export type GetBlockedTimeGqlQueryVariables = Types.Exact<{
  whereBlockedTime?: Types.InputMaybe<Types.Blocked_Time_Bool_Exp>;
  limitBlockedTime?: Types.InputMaybe<Types.Scalars['Int']>;
  offsetBlockedTime?: Types.InputMaybe<Types.Scalars['Int']>;
  orderByBlockedTime?: Types.InputMaybe<Array<Types.Blocked_Time_Order_By> | Types.Blocked_Time_Order_By>;
}>;


export type GetBlockedTimeGqlQuery = { blocked_time: Array<(
    { __typename?: 'blocked_time' }
    & Pick<Types.Blocked_Time, 'all_day' | 'dart' | 'date_number' | 'id' | 'pool' | 'time_from' | 'time_to' | 'location'>
  )> };

export type GetOrderIdGqlQueryVariables = Types.Exact<{
  whereOrder?: Types.InputMaybe<Types.Order_Bool_Exp>;
}>;


export type GetOrderIdGqlQuery = { order: Array<(
    { __typename?: 'order' }
    & Pick<Types.Order, 'id'>
  )> };

export type GetReservationBlockedDaysGqlQueryVariables = Types.Exact<{
  whereBlockedTime?: Types.InputMaybe<Types.Blocked_Time_Bool_Exp>;
}>;


export type GetReservationBlockedDaysGqlQuery = { blocked_time: Array<(
    { __typename?: 'blocked_time' }
    & Pick<Types.Blocked_Time, 'date_number'>
  )> };

export type GetReservationBlockedTimesGqlQueryVariables = Types.Exact<{
  whereBlockedTime?: Types.InputMaybe<Types.Blocked_Time_Bool_Exp>;
  order_byBlockedTime?: Types.InputMaybe<Array<Types.Blocked_Time_Order_By> | Types.Blocked_Time_Order_By>;
}>;


export type GetReservationBlockedTimesGqlQuery = { blocked_time: Array<(
    { __typename?: 'blocked_time' }
    & Pick<Types.Blocked_Time, 'id' | 'pool' | 'dart' | 'date_number' | 'time_from' | 'time_to' | 'all_day'>
  )> };

export type CheckUserSessionGqlQueryVariables = Types.Exact<{
  whereToken?: Types.InputMaybe<Types.Token_Bool_Exp>;
}>;


export type CheckUserSessionGqlQuery = { token: Array<(
    { __typename?: 'token' }
    & Pick<Types.Token, 'id' | 'created_at' | 'token' | 'user_id'>
    & { User: (
      { __typename?: 'user' }
      & Pick<Types.User, 'id' | 'username' | 'blocked' | 'role_id'>
    ) }
  )> };

export type GetAuthUserGqlQueryVariables = Types.Exact<{
  whereUser?: Types.InputMaybe<Types.User_Bool_Exp>;
  withPassword: Types.Scalars['Boolean'];
}>;


export type GetAuthUserGqlQuery = { user: Array<(
    { __typename?: 'user' }
    & Types.MakeOptional<Pick<Types.User, 'username' | 'blocked' | 'created_at' | 'email' | 'id' | 'name' | 'password' | 'role_id' | 'updated_at'>, 'password'>
  )> };

export type InsertBlockedTimeGqlMutationVariables = Types.Exact<{
  objectsInsertBlockedTime: Array<Types.Blocked_Time_Insert_Input> | Types.Blocked_Time_Insert_Input;
}>;


export type InsertBlockedTimeGqlMutation = { insert_blocked_time?: Types.Maybe<(
    { __typename?: 'blocked_time_mutation_response' }
    & Pick<Types.Blocked_Time_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'blocked_time' }
      & Pick<Types.Blocked_Time, 'id'>
    )> }
  )> };

export type UpdateBlockedTimeGqlMutationVariables = Types.Exact<{
  whereUpdateBlockedTime: Types.Blocked_Time_Bool_Exp;
  _setUpdateBlockedTime: Types.Blocked_Time_Set_Input;
}>;


export type UpdateBlockedTimeGqlMutation = { update_blocked_time?: Types.Maybe<(
    { __typename?: 'blocked_time_mutation_response' }
    & Pick<Types.Blocked_Time_Mutation_Response, 'affected_rows'>
  )> };

export type DeleteBlockedTimeGqlMutationVariables = Types.Exact<{
  whereDeleteBlockedTime: Types.Blocked_Time_Bool_Exp;
}>;


export type DeleteBlockedTimeGqlMutation = { delete_blocked_time?: Types.Maybe<(
    { __typename?: 'blocked_time_mutation_response' }
    & Pick<Types.Blocked_Time_Mutation_Response, 'affected_rows'>
  )> };

export type UpsertGroupGqlMutationVariables = Types.Exact<{
  objectsUpsertGroup: Array<Types.Group_Insert_Input> | Types.Group_Insert_Input;
  on_conflictUpsertGroup?: Types.InputMaybe<Types.Group_On_Conflict>;
}>;


export type UpsertGroupGqlMutation = { insert_group?: Types.Maybe<(
    { __typename?: 'group_mutation_response' }
    & { returning: Array<(
      { __typename?: 'group' }
      & Pick<Types.Group, 'id'>
    )> }
  )> };

export type InsertGroupGqlMutationVariables = Types.Exact<{
  objectsInsertGroup: Array<Types.Group_Insert_Input> | Types.Group_Insert_Input;
}>;


export type InsertGroupGqlMutation = { insert_group?: Types.Maybe<(
    { __typename?: 'group_mutation_response' }
    & { returning: Array<(
      { __typename?: 'group' }
      & Pick<Types.Group, 'id'>
    )> }
  )> };

export type UpdateGroupGqlMutationVariables = Types.Exact<{
  whereUpdateGroup: Types.Group_Bool_Exp;
  _setUpdateGroup?: Types.InputMaybe<Types.Group_Set_Input>;
}>;


export type UpdateGroupGqlMutation = { update_group?: Types.Maybe<(
    { __typename?: 'group_mutation_response' }
    & { returning: Array<(
      { __typename?: 'group' }
      & Pick<Types.Group, 'id'>
    )> }
  )> };

export type DeleteGroupGqlMutationVariables = Types.Exact<{
  whereDeleteGroup: Types.Group_Bool_Exp;
}>;


export type DeleteGroupGqlMutation = { delete_group?: Types.Maybe<(
    { __typename?: 'group_mutation_response' }
    & { returning: Array<(
      { __typename?: 'group' }
      & Pick<Types.Group, 'id'>
    )> }
  )> };

export type GetGroupAndProductGqlQueryVariables = Types.Exact<{
  whereGroup?: Types.InputMaybe<Types.Group_Bool_Exp>;
  whereProduct?: Types.InputMaybe<Types.Product_Bool_Exp>;
}>;


export type GetGroupAndProductGqlQuery = { group: Array<(
    { __typename?: 'group' }
    & Pick<Types.Group, 'id' | 'ikko_id' | 'name' | 'ikos_group_json'>
  )>, product: Array<(
    { __typename?: 'product' }
    & Pick<Types.Product, 'id' | 'ikko_id' | 'ikos_product_json'>
  )> };

export type UpsertOrderItemGqlMutationVariables = Types.Exact<{
  objectsUpsertOrderItem: Array<Types.Order_Item_Insert_Input> | Types.Order_Item_Insert_Input;
  on_conflictUpsertOrderItem?: Types.InputMaybe<Types.Order_Item_On_Conflict>;
}>;


export type UpsertOrderItemGqlMutation = { insert_order_item?: Types.Maybe<(
    { __typename?: 'order_item_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order_item' }
      & Pick<Types.Order_Item, 'id'>
    )> }
  )> };

export type InsertOrderItemGqlMutationVariables = Types.Exact<{
  objectsInsertOrderItem: Array<Types.Order_Item_Insert_Input> | Types.Order_Item_Insert_Input;
}>;


export type InsertOrderItemGqlMutation = { insert_order_item?: Types.Maybe<(
    { __typename?: 'order_item_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order_item' }
      & Pick<Types.Order_Item, 'id'>
    )> }
  )> };

export type UpdateOrderItemGqlMutationVariables = Types.Exact<{
  whereUpdateOrderItem: Types.Order_Item_Bool_Exp;
  _setUpdateOrderItem?: Types.InputMaybe<Types.Order_Item_Set_Input>;
}>;


export type UpdateOrderItemGqlMutation = { update_order_item?: Types.Maybe<(
    { __typename?: 'order_item_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order_item' }
      & Pick<Types.Order_Item, 'id'>
    )> }
  )> };

export type DeleteOrderItemGqlMutationVariables = Types.Exact<{
  whereDeleteOrderItem: Types.Order_Item_Bool_Exp;
}>;


export type DeleteOrderItemGqlMutation = { delete_order_item?: Types.Maybe<(
    { __typename?: 'order_item_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order_item' }
      & Pick<Types.Order_Item, 'id'>
    )> }
  )> };

export type UpsertOrderGqlMutationVariables = Types.Exact<{
  objectsUpsertOrder: Array<Types.Order_Insert_Input> | Types.Order_Insert_Input;
  on_conflictUpsertOrder?: Types.InputMaybe<Types.Order_On_Conflict>;
}>;


export type UpsertOrderGqlMutation = { insert_order?: Types.Maybe<(
    { __typename?: 'order_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order' }
      & Pick<Types.Order, 'id'>
    )> }
  )> };

export type InsertOrderGqlMutationVariables = Types.Exact<{
  objectsInsertOrder: Array<Types.Order_Insert_Input> | Types.Order_Insert_Input;
}>;


export type InsertOrderGqlMutation = { insert_order?: Types.Maybe<(
    { __typename?: 'order_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order' }
      & Pick<Types.Order, 'id'>
    )> }
  )> };

export type UpdateOrderGqlMutationVariables = Types.Exact<{
  whereUpdateOrder: Types.Order_Bool_Exp;
  _setUpdateOrder?: Types.InputMaybe<Types.Order_Set_Input>;
}>;


export type UpdateOrderGqlMutation = { update_order?: Types.Maybe<(
    { __typename?: 'order_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order' }
      & Pick<Types.Order, 'id'>
    )> }
  )> };

export type DeleteOrderGqlMutationVariables = Types.Exact<{
  whereDeleteOrder: Types.Order_Bool_Exp;
}>;


export type DeleteOrderGqlMutation = { delete_order?: Types.Maybe<(
    { __typename?: 'order_mutation_response' }
    & { returning: Array<(
      { __typename?: 'order' }
      & Pick<Types.Order, 'id'>
    )> }
  )> };

export type UpsertProductCategoryGqlMutationVariables = Types.Exact<{
  objectsUpsertProductCategory: Array<Types.Product_Category_Insert_Input> | Types.Product_Category_Insert_Input;
  on_conflictUpsertProductCategory?: Types.InputMaybe<Types.Product_Category_On_Conflict>;
}>;


export type UpsertProductCategoryGqlMutation = { insert_product_category?: Types.Maybe<(
    { __typename?: 'product_category_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product_category' }
      & Pick<Types.Product_Category, 'id'>
    )> }
  )> };

export type InsertProductCategoryGqlMutationVariables = Types.Exact<{
  objectsInsertProductCategory: Array<Types.Product_Category_Insert_Input> | Types.Product_Category_Insert_Input;
}>;


export type InsertProductCategoryGqlMutation = { insert_product_category?: Types.Maybe<(
    { __typename?: 'product_category_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product_category' }
      & Pick<Types.Product_Category, 'id'>
    )> }
  )> };

export type UpdateProductCategoryGqlMutationVariables = Types.Exact<{
  whereUpdateProductCategory: Types.Product_Category_Bool_Exp;
  _setUpdateProductCategory?: Types.InputMaybe<Types.Product_Category_Set_Input>;
}>;


export type UpdateProductCategoryGqlMutation = { update_product_category?: Types.Maybe<(
    { __typename?: 'product_category_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product_category' }
      & Pick<Types.Product_Category, 'id'>
    )> }
  )> };

export type DeleteProductCategoryGqlMutationVariables = Types.Exact<{
  whereDeleteProductCategory: Types.Product_Category_Bool_Exp;
}>;


export type DeleteProductCategoryGqlMutation = { delete_product_category?: Types.Maybe<(
    { __typename?: 'product_category_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product_category' }
      & Pick<Types.Product_Category, 'id'>
    )> }
  )> };

export type UpsertProductGqlMutationVariables = Types.Exact<{
  objectsUpsertProduct: Array<Types.Product_Insert_Input> | Types.Product_Insert_Input;
  on_conflictUpsertProduct?: Types.InputMaybe<Types.Product_On_Conflict>;
}>;


export type UpsertProductGqlMutation = { insert_product?: Types.Maybe<(
    { __typename?: 'product_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product' }
      & Pick<Types.Product, 'id'>
    )> }
  )> };

export type InsertProductGqlMutationVariables = Types.Exact<{
  objectsInsertProduct: Array<Types.Product_Insert_Input> | Types.Product_Insert_Input;
}>;


export type InsertProductGqlMutation = { insert_product?: Types.Maybe<(
    { __typename?: 'product_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product' }
      & Pick<Types.Product, 'id'>
    )> }
  )> };

export type UpdateProductGqlMutationVariables = Types.Exact<{
  whereUpdateProduct: Types.Product_Bool_Exp;
  _setUpdateProduct?: Types.InputMaybe<Types.Product_Set_Input>;
}>;


export type UpdateProductGqlMutation = { update_product?: Types.Maybe<(
    { __typename?: 'product_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product' }
      & Pick<Types.Product, 'id'>
    )> }
  )> };

export type DeleteProductGqlMutationVariables = Types.Exact<{
  whereDeleteProduct: Types.Product_Bool_Exp;
}>;


export type DeleteProductGqlMutation = { delete_product?: Types.Maybe<(
    { __typename?: 'product_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product' }
      & Pick<Types.Product, 'id'>
    )> }
  )> };

export type AddReservationGqlMutationVariables = Types.Exact<{
  objectsAddReservation: Array<Types.Reservation_Insert_Input> | Types.Reservation_Insert_Input;
}>;


export type AddReservationGqlMutation = { insert_reservation?: Types.Maybe<(
    { __typename?: 'reservation_mutation_response' }
    & { returning: Array<(
      { __typename?: 'reservation' }
      & Pick<Types.Reservation, 'id'>
    )> }
  )> };

export type EditReservationGqlMutationVariables = Types.Exact<{
  whereEditReservation: Types.Reservation_Bool_Exp;
  _setEditReservation?: Types.InputMaybe<Types.Reservation_Set_Input>;
}>;


export type EditReservationGqlMutation = { update_reservation?: Types.Maybe<(
    { __typename?: 'reservation_mutation_response' }
    & { returning: Array<(
      { __typename?: 'reservation' }
      & Pick<Types.Reservation, 'id'>
    )> }
  )> };

export type DeleteReservationGqlMutationVariables = Types.Exact<{
  whereDeleteReservation: Types.Reservation_Bool_Exp;
}>;


export type DeleteReservationGqlMutation = { delete_reservation?: Types.Maybe<(
    { __typename?: 'reservation_mutation_response' }
    & { returning: Array<(
      { __typename?: 'reservation' }
      & Pick<Types.Reservation, 'id'>
    )> }
  )> };

export type AddTokenGqlMutationVariables = Types.Exact<{
  objectsAddToken: Array<Types.Token_Insert_Input> | Types.Token_Insert_Input;
}>;


export type AddTokenGqlMutation = { insert_token?: Types.Maybe<(
    { __typename?: 'token_mutation_response' }
    & { returning: Array<(
      { __typename?: 'token' }
      & Pick<Types.Token, 'id'>
    )> }
  )> };

export type EditTokenGqlMutationVariables = Types.Exact<{
  whereEditToken: Types.Token_Bool_Exp;
  _setEditToken?: Types.InputMaybe<Types.Token_Set_Input>;
}>;


export type EditTokenGqlMutation = { update_token?: Types.Maybe<(
    { __typename?: 'token_mutation_response' }
    & { returning: Array<(
      { __typename?: 'token' }
      & Pick<Types.Token, 'id'>
    )> }
  )> };

export type DeleteTokenGqlMutationVariables = Types.Exact<{
  whereDeleteToken: Types.Token_Bool_Exp;
}>;


export type DeleteTokenGqlMutation = { delete_token?: Types.Maybe<(
    { __typename?: 'token_mutation_response' }
    & { returning: Array<(
      { __typename?: 'token' }
      & Pick<Types.Token, 'id'>
    )> }
  )> };

export type AddUserGqlMutationVariables = Types.Exact<{
  objectsAddUser: Array<Types.User_Insert_Input> | Types.User_Insert_Input;
}>;


export type AddUserGqlMutation = { insert_user?: Types.Maybe<(
    { __typename?: 'user_mutation_response' }
    & { returning: Array<(
      { __typename?: 'user' }
      & Pick<Types.User, 'id'>
    )> }
  )> };

export type EditUserGqlMutationVariables = Types.Exact<{
  whereEditUser: Types.User_Bool_Exp;
  _setEditUser?: Types.InputMaybe<Types.User_Set_Input>;
}>;


export type EditUserGqlMutation = { update_user?: Types.Maybe<(
    { __typename?: 'user_mutation_response' }
    & { returning: Array<(
      { __typename?: 'user' }
      & Pick<Types.User, 'id'>
    )> }
  )> };

export type DeleteUserGqlMutationVariables = Types.Exact<{
  whereDeleteUser: Types.User_Bool_Exp;
}>;


export type DeleteUserGqlMutation = { delete_user?: Types.Maybe<(
    { __typename?: 'user_mutation_response' }
    & { returning: Array<(
      { __typename?: 'user' }
      & Pick<Types.User, 'id'>
    )> }
  )> };

export type IndexV1GqlQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type IndexV1GqlQuery = { __typename: 'query_root' };
