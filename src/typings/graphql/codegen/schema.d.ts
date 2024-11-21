export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  float8: number;
  json: any;
  jsonb: object;
  timestamptz: Date;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "blocked_time" */
export type Blocked_Time = {
  __typename?: 'blocked_time';
  all_day?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['timestamptz'];
  dart?: Maybe<Scalars['Boolean']>;
  date_number?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['Int'];
  /** Kaunas/Vilnius */
  location: Scalars['String'];
  pool?: Maybe<Scalars['Boolean']>;
  time_from?: Maybe<Scalars['String']>;
  time_to?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "blocked_time" */
export type Blocked_Time_Aggregate = {
  __typename?: 'blocked_time_aggregate';
  aggregate?: Maybe<Blocked_Time_Aggregate_Fields>;
  nodes: Array<Blocked_Time>;
};

/** aggregate fields of "blocked_time" */
export type Blocked_Time_Aggregate_Fields = {
  __typename?: 'blocked_time_aggregate_fields';
  avg?: Maybe<Blocked_Time_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Blocked_Time_Max_Fields>;
  min?: Maybe<Blocked_Time_Min_Fields>;
  stddev?: Maybe<Blocked_Time_Stddev_Fields>;
  stddev_pop?: Maybe<Blocked_Time_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Blocked_Time_Stddev_Samp_Fields>;
  sum?: Maybe<Blocked_Time_Sum_Fields>;
  var_pop?: Maybe<Blocked_Time_Var_Pop_Fields>;
  var_samp?: Maybe<Blocked_Time_Var_Samp_Fields>;
  variance?: Maybe<Blocked_Time_Variance_Fields>;
};


/** aggregate fields of "blocked_time" */
export type Blocked_Time_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blocked_Time_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Blocked_Time_Avg_Fields = {
  __typename?: 'blocked_time_avg_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "blocked_time". All fields are combined with a logical 'AND'. */
export type Blocked_Time_Bool_Exp = {
  _and?: InputMaybe<Array<Blocked_Time_Bool_Exp>>;
  _not?: InputMaybe<Blocked_Time_Bool_Exp>;
  _or?: InputMaybe<Array<Blocked_Time_Bool_Exp>>;
  all_day?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dart?: InputMaybe<Boolean_Comparison_Exp>;
  date_number?: InputMaybe<Int_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  pool?: InputMaybe<Boolean_Comparison_Exp>;
  time_from?: InputMaybe<String_Comparison_Exp>;
  time_to?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "blocked_time" */
export type Blocked_Time_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'blocked_time_pkey';

/** input type for incrementing numeric columns in table "blocked_time" */
export type Blocked_Time_Inc_Input = {
  date_number?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "blocked_time" */
export type Blocked_Time_Insert_Input = {
  all_day?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  dart?: InputMaybe<Scalars['Boolean']>;
  date_number?: InputMaybe<Scalars['Int']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['Boolean']>;
  time_from?: InputMaybe<Scalars['String']>;
  time_to?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Blocked_Time_Max_Fields = {
  __typename?: 'blocked_time_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  date_number?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  /** Kaunas/Vilnius */
  location?: Maybe<Scalars['String']>;
  time_from?: Maybe<Scalars['String']>;
  time_to?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Blocked_Time_Min_Fields = {
  __typename?: 'blocked_time_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  date_number?: Maybe<Scalars['Int']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  /** Kaunas/Vilnius */
  location?: Maybe<Scalars['String']>;
  time_from?: Maybe<Scalars['String']>;
  time_to?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "blocked_time" */
export type Blocked_Time_Mutation_Response = {
  __typename?: 'blocked_time_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Blocked_Time>;
};

/** on_conflict condition type for table "blocked_time" */
export type Blocked_Time_On_Conflict = {
  constraint: Blocked_Time_Constraint;
  update_columns?: Array<Blocked_Time_Update_Column>;
  where?: InputMaybe<Blocked_Time_Bool_Exp>;
};

/** Ordering options when selecting data from "blocked_time". */
export type Blocked_Time_Order_By = {
  all_day?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dart?: InputMaybe<Order_By>;
  date_number?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  pool?: InputMaybe<Order_By>;
  time_from?: InputMaybe<Order_By>;
  time_to?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: blocked_time */
export type Blocked_Time_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "blocked_time" */
export type Blocked_Time_Select_Column =
  /** column name */
  | 'all_day'
  /** column name */
  | 'created_at'
  /** column name */
  | 'dart'
  /** column name */
  | 'date_number'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'location'
  /** column name */
  | 'pool'
  /** column name */
  | 'time_from'
  /** column name */
  | 'time_to'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "blocked_time" */
export type Blocked_Time_Set_Input = {
  all_day?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  dart?: InputMaybe<Scalars['Boolean']>;
  date_number?: InputMaybe<Scalars['Int']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['Boolean']>;
  time_from?: InputMaybe<Scalars['String']>;
  time_to?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Blocked_Time_Stddev_Fields = {
  __typename?: 'blocked_time_stddev_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Blocked_Time_Stddev_Pop_Fields = {
  __typename?: 'blocked_time_stddev_pop_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Blocked_Time_Stddev_Samp_Fields = {
  __typename?: 'blocked_time_stddev_samp_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "blocked_time" */
export type Blocked_Time_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blocked_Time_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Blocked_Time_Stream_Cursor_Value_Input = {
  all_day?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  dart?: InputMaybe<Scalars['Boolean']>;
  date_number?: InputMaybe<Scalars['Int']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['Boolean']>;
  time_from?: InputMaybe<Scalars['String']>;
  time_to?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Blocked_Time_Sum_Fields = {
  __typename?: 'blocked_time_sum_fields';
  date_number?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "blocked_time" */
export type Blocked_Time_Update_Column =
  /** column name */
  | 'all_day'
  /** column name */
  | 'created_at'
  /** column name */
  | 'dart'
  /** column name */
  | 'date_number'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'location'
  /** column name */
  | 'pool'
  /** column name */
  | 'time_from'
  /** column name */
  | 'time_to'
  /** column name */
  | 'updated_at';

export type Blocked_Time_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Blocked_Time_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blocked_Time_Set_Input>;
  /** filter the rows which have to be updated */
  where: Blocked_Time_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Blocked_Time_Var_Pop_Fields = {
  __typename?: 'blocked_time_var_pop_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Blocked_Time_Var_Samp_Fields = {
  __typename?: 'blocked_time_var_samp_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Blocked_Time_Variance_Fields = {
  __typename?: 'blocked_time_variance_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']>;
  _gt?: InputMaybe<Scalars['float8']>;
  _gte?: InputMaybe<Scalars['float8']>;
  _in?: InputMaybe<Array<Scalars['float8']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['float8']>;
  _lte?: InputMaybe<Scalars['float8']>;
  _neq?: InputMaybe<Scalars['float8']>;
  _nin?: InputMaybe<Array<Scalars['float8']>>;
};

/** columns and relationships of "group" */
export type Group = {
  __typename?: 'group';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['Int'];
  ikko_id?: Maybe<Scalars['String']>;
  ikos_group_json?: Maybe<Scalars['json']>;
  is_included_in_menu?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "group" */
export type GroupIkos_Group_JsonArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "group" */
export type Group_Aggregate = {
  __typename?: 'group_aggregate';
  aggregate?: Maybe<Group_Aggregate_Fields>;
  nodes: Array<Group>;
};

/** aggregate fields of "group" */
export type Group_Aggregate_Fields = {
  __typename?: 'group_aggregate_fields';
  avg?: Maybe<Group_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Group_Max_Fields>;
  min?: Maybe<Group_Min_Fields>;
  stddev?: Maybe<Group_Stddev_Fields>;
  stddev_pop?: Maybe<Group_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Group_Stddev_Samp_Fields>;
  sum?: Maybe<Group_Sum_Fields>;
  var_pop?: Maybe<Group_Var_Pop_Fields>;
  var_samp?: Maybe<Group_Var_Samp_Fields>;
  variance?: Maybe<Group_Variance_Fields>;
};


/** aggregate fields of "group" */
export type Group_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Group_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Group_Avg_Fields = {
  __typename?: 'group_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "group". All fields are combined with a logical 'AND'. */
export type Group_Bool_Exp = {
  _and?: InputMaybe<Array<Group_Bool_Exp>>;
  _not?: InputMaybe<Group_Bool_Exp>;
  _or?: InputMaybe<Array<Group_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  ikko_id?: InputMaybe<String_Comparison_Exp>;
  ikos_group_json?: InputMaybe<Json_Comparison_Exp>;
  is_included_in_menu?: InputMaybe<Boolean_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "group" */
export type Group_Constraint =
  /** unique or primary key constraint on columns "ikko_id" */
  | 'group_ikko_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'group_pkey';

/** input type for incrementing numeric columns in table "group" */
export type Group_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "group" */
export type Group_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikos_group_json?: InputMaybe<Scalars['json']>;
  is_included_in_menu?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Group_Max_Fields = {
  __typename?: 'group_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikko_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Group_Min_Fields = {
  __typename?: 'group_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikko_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "group" */
export type Group_Mutation_Response = {
  __typename?: 'group_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Group>;
};

/** on_conflict condition type for table "group" */
export type Group_On_Conflict = {
  constraint: Group_Constraint;
  update_columns?: Array<Group_Update_Column>;
  where?: InputMaybe<Group_Bool_Exp>;
};

/** Ordering options when selecting data from "group". */
export type Group_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ikko_id?: InputMaybe<Order_By>;
  ikos_group_json?: InputMaybe<Order_By>;
  is_included_in_menu?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: group */
export type Group_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "group" */
export type Group_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikko_id'
  /** column name */
  | 'ikos_group_json'
  /** column name */
  | 'is_included_in_menu'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'organization_id'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "group" */
export type Group_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikos_group_json?: InputMaybe<Scalars['json']>;
  is_included_in_menu?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Group_Stddev_Fields = {
  __typename?: 'group_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Group_Stddev_Pop_Fields = {
  __typename?: 'group_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Group_Stddev_Samp_Fields = {
  __typename?: 'group_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "group" */
export type Group_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Group_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Group_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikos_group_json?: InputMaybe<Scalars['json']>;
  is_included_in_menu?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Group_Sum_Fields = {
  __typename?: 'group_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "group" */
export type Group_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikko_id'
  /** column name */
  | 'ikos_group_json'
  /** column name */
  | 'is_included_in_menu'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'organization_id'
  /** column name */
  | 'updated_at';

export type Group_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Group_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Group_Set_Input>;
  /** filter the rows which have to be updated */
  where: Group_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Group_Var_Pop_Fields = {
  __typename?: 'group_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Group_Var_Samp_Fields = {
  __typename?: 'group_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Group_Variance_Fields = {
  __typename?: 'group_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "blocked_time" */
  delete_blocked_time?: Maybe<Blocked_Time_Mutation_Response>;
  /** delete single row from the table: "blocked_time" */
  delete_blocked_time_by_pk?: Maybe<Blocked_Time>;
  /** delete data from the table: "group" */
  delete_group?: Maybe<Group_Mutation_Response>;
  /** delete single row from the table: "group" */
  delete_group_by_pk?: Maybe<Group>;
  /** delete data from the table: "order" */
  delete_order?: Maybe<Order_Mutation_Response>;
  /** delete single row from the table: "order" */
  delete_order_by_pk?: Maybe<Order>;
  /** delete data from the table: "order_item" */
  delete_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** delete single row from the table: "order_item" */
  delete_order_item_by_pk?: Maybe<Order_Item>;
  /** delete data from the table: "product" */
  delete_product?: Maybe<Product_Mutation_Response>;
  /** delete single row from the table: "product" */
  delete_product_by_pk?: Maybe<Product>;
  /** delete data from the table: "product_category" */
  delete_product_category?: Maybe<Product_Category_Mutation_Response>;
  /** delete single row from the table: "product_category" */
  delete_product_category_by_pk?: Maybe<Product_Category>;
  /** delete data from the table: "public_test" */
  delete_public_test?: Maybe<Public_Test_Mutation_Response>;
  /** delete single row from the table: "public_test" */
  delete_public_test_by_pk?: Maybe<Public_Test>;
  /** delete data from the table: "reservation" */
  delete_reservation?: Maybe<Reservation_Mutation_Response>;
  /** delete single row from the table: "reservation" */
  delete_reservation_by_pk?: Maybe<Reservation>;
  /** delete data from the table: "token" */
  delete_token?: Maybe<Token_Mutation_Response>;
  /** delete single row from the table: "token" */
  delete_token_by_pk?: Maybe<Token>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** insert data into the table: "blocked_time" */
  insert_blocked_time?: Maybe<Blocked_Time_Mutation_Response>;
  /** insert a single row into the table: "blocked_time" */
  insert_blocked_time_one?: Maybe<Blocked_Time>;
  /** insert data into the table: "group" */
  insert_group?: Maybe<Group_Mutation_Response>;
  /** insert a single row into the table: "group" */
  insert_group_one?: Maybe<Group>;
  /** insert data into the table: "order" */
  insert_order?: Maybe<Order_Mutation_Response>;
  /** insert data into the table: "order_item" */
  insert_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** insert a single row into the table: "order_item" */
  insert_order_item_one?: Maybe<Order_Item>;
  /** insert a single row into the table: "order" */
  insert_order_one?: Maybe<Order>;
  /** insert data into the table: "product" */
  insert_product?: Maybe<Product_Mutation_Response>;
  /** insert data into the table: "product_category" */
  insert_product_category?: Maybe<Product_Category_Mutation_Response>;
  /** insert a single row into the table: "product_category" */
  insert_product_category_one?: Maybe<Product_Category>;
  /** insert a single row into the table: "product" */
  insert_product_one?: Maybe<Product>;
  /** insert data into the table: "public_test" */
  insert_public_test?: Maybe<Public_Test_Mutation_Response>;
  /** insert a single row into the table: "public_test" */
  insert_public_test_one?: Maybe<Public_Test>;
  /** insert data into the table: "reservation" */
  insert_reservation?: Maybe<Reservation_Mutation_Response>;
  /** insert a single row into the table: "reservation" */
  insert_reservation_one?: Maybe<Reservation>;
  /** insert data into the table: "token" */
  insert_token?: Maybe<Token_Mutation_Response>;
  /** insert a single row into the table: "token" */
  insert_token_one?: Maybe<Token>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** update data of the table: "blocked_time" */
  update_blocked_time?: Maybe<Blocked_Time_Mutation_Response>;
  /** update single row of the table: "blocked_time" */
  update_blocked_time_by_pk?: Maybe<Blocked_Time>;
  /** update multiples rows of table: "blocked_time" */
  update_blocked_time_many?: Maybe<Array<Maybe<Blocked_Time_Mutation_Response>>>;
  /** update data of the table: "group" */
  update_group?: Maybe<Group_Mutation_Response>;
  /** update single row of the table: "group" */
  update_group_by_pk?: Maybe<Group>;
  /** update multiples rows of table: "group" */
  update_group_many?: Maybe<Array<Maybe<Group_Mutation_Response>>>;
  /** update data of the table: "order" */
  update_order?: Maybe<Order_Mutation_Response>;
  /** update single row of the table: "order" */
  update_order_by_pk?: Maybe<Order>;
  /** update data of the table: "order_item" */
  update_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** update single row of the table: "order_item" */
  update_order_item_by_pk?: Maybe<Order_Item>;
  /** update multiples rows of table: "order_item" */
  update_order_item_many?: Maybe<Array<Maybe<Order_Item_Mutation_Response>>>;
  /** update multiples rows of table: "order" */
  update_order_many?: Maybe<Array<Maybe<Order_Mutation_Response>>>;
  /** update data of the table: "product" */
  update_product?: Maybe<Product_Mutation_Response>;
  /** update single row of the table: "product" */
  update_product_by_pk?: Maybe<Product>;
  /** update data of the table: "product_category" */
  update_product_category?: Maybe<Product_Category_Mutation_Response>;
  /** update single row of the table: "product_category" */
  update_product_category_by_pk?: Maybe<Product_Category>;
  /** update multiples rows of table: "product_category" */
  update_product_category_many?: Maybe<Array<Maybe<Product_Category_Mutation_Response>>>;
  /** update multiples rows of table: "product" */
  update_product_many?: Maybe<Array<Maybe<Product_Mutation_Response>>>;
  /** update data of the table: "public_test" */
  update_public_test?: Maybe<Public_Test_Mutation_Response>;
  /** update single row of the table: "public_test" */
  update_public_test_by_pk?: Maybe<Public_Test>;
  /** update multiples rows of table: "public_test" */
  update_public_test_many?: Maybe<Array<Maybe<Public_Test_Mutation_Response>>>;
  /** update data of the table: "reservation" */
  update_reservation?: Maybe<Reservation_Mutation_Response>;
  /** update single row of the table: "reservation" */
  update_reservation_by_pk?: Maybe<Reservation>;
  /** update multiples rows of table: "reservation" */
  update_reservation_many?: Maybe<Array<Maybe<Reservation_Mutation_Response>>>;
  /** update data of the table: "token" */
  update_token?: Maybe<Token_Mutation_Response>;
  /** update single row of the table: "token" */
  update_token_by_pk?: Maybe<Token>;
  /** update multiples rows of table: "token" */
  update_token_many?: Maybe<Array<Maybe<Token_Mutation_Response>>>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update multiples rows of table: "user" */
  update_user_many?: Maybe<Array<Maybe<User_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Blocked_TimeArgs = {
  where: Blocked_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blocked_Time_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_GroupArgs = {
  where: Group_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Group_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_OrderArgs = {
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Order_ItemArgs = {
  where: Order_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Item_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ProductArgs = {
  where: Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Product_CategoryArgs = {
  where: Product_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Category_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Public_TestArgs = {
  where: Public_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Public_Test_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ReservationArgs = {
  where: Reservation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Reservation_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_TokenArgs = {
  where: Token_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Token_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_Blocked_TimeArgs = {
  objects: Array<Blocked_Time_Insert_Input>;
  on_conflict?: InputMaybe<Blocked_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blocked_Time_OneArgs = {
  object: Blocked_Time_Insert_Input;
  on_conflict?: InputMaybe<Blocked_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupArgs = {
  objects: Array<Group_Insert_Input>;
  on_conflict?: InputMaybe<Group_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Group_OneArgs = {
  object: Group_Insert_Input;
  on_conflict?: InputMaybe<Group_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrderArgs = {
  objects: Array<Order_Insert_Input>;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_ItemArgs = {
  objects: Array<Order_Item_Insert_Input>;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Item_OneArgs = {
  object: Order_Item_Insert_Input;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_OneArgs = {
  object: Order_Insert_Input;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductArgs = {
  objects: Array<Product_Insert_Input>;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_CategoryArgs = {
  objects: Array<Product_Category_Insert_Input>;
  on_conflict?: InputMaybe<Product_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Category_OneArgs = {
  object: Product_Category_Insert_Input;
  on_conflict?: InputMaybe<Product_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_OneArgs = {
  object: Product_Insert_Input;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Public_TestArgs = {
  objects: Array<Public_Test_Insert_Input>;
  on_conflict?: InputMaybe<Public_Test_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Public_Test_OneArgs = {
  object: Public_Test_Insert_Input;
  on_conflict?: InputMaybe<Public_Test_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ReservationArgs = {
  objects: Array<Reservation_Insert_Input>;
  on_conflict?: InputMaybe<Reservation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Reservation_OneArgs = {
  object: Reservation_Insert_Input;
  on_conflict?: InputMaybe<Reservation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TokenArgs = {
  objects: Array<Token_Insert_Input>;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Token_OneArgs = {
  object: Token_Insert_Input;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Blocked_TimeArgs = {
  _inc?: InputMaybe<Blocked_Time_Inc_Input>;
  _set?: InputMaybe<Blocked_Time_Set_Input>;
  where: Blocked_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Blocked_Time_By_PkArgs = {
  _inc?: InputMaybe<Blocked_Time_Inc_Input>;
  _set?: InputMaybe<Blocked_Time_Set_Input>;
  pk_columns: Blocked_Time_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Blocked_Time_ManyArgs = {
  updates: Array<Blocked_Time_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_GroupArgs = {
  _inc?: InputMaybe<Group_Inc_Input>;
  _set?: InputMaybe<Group_Set_Input>;
  where: Group_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Group_By_PkArgs = {
  _inc?: InputMaybe<Group_Inc_Input>;
  _set?: InputMaybe<Group_Set_Input>;
  pk_columns: Group_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Group_ManyArgs = {
  updates: Array<Group_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OrderArgs = {
  _inc?: InputMaybe<Order_Inc_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_By_PkArgs = {
  _inc?: InputMaybe<Order_Inc_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  pk_columns: Order_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_ItemArgs = {
  _append?: InputMaybe<Order_Item_Append_Input>;
  _delete_at_path?: InputMaybe<Order_Item_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Order_Item_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Order_Item_Delete_Key_Input>;
  _inc?: InputMaybe<Order_Item_Inc_Input>;
  _prepend?: InputMaybe<Order_Item_Prepend_Input>;
  _set?: InputMaybe<Order_Item_Set_Input>;
  where: Order_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_By_PkArgs = {
  _append?: InputMaybe<Order_Item_Append_Input>;
  _delete_at_path?: InputMaybe<Order_Item_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Order_Item_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Order_Item_Delete_Key_Input>;
  _inc?: InputMaybe<Order_Item_Inc_Input>;
  _prepend?: InputMaybe<Order_Item_Prepend_Input>;
  _set?: InputMaybe<Order_Item_Set_Input>;
  pk_columns: Order_Item_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_ManyArgs = {
  updates: Array<Order_Item_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_ManyArgs = {
  updates: Array<Order_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ProductArgs = {
  _inc?: InputMaybe<Product_Inc_Input>;
  _set?: InputMaybe<Product_Set_Input>;
  where: Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_By_PkArgs = {
  _inc?: InputMaybe<Product_Inc_Input>;
  _set?: InputMaybe<Product_Set_Input>;
  pk_columns: Product_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_CategoryArgs = {
  _inc?: InputMaybe<Product_Category_Inc_Input>;
  _set?: InputMaybe<Product_Category_Set_Input>;
  where: Product_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Category_By_PkArgs = {
  _inc?: InputMaybe<Product_Category_Inc_Input>;
  _set?: InputMaybe<Product_Category_Set_Input>;
  pk_columns: Product_Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Category_ManyArgs = {
  updates: Array<Product_Category_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Product_ManyArgs = {
  updates: Array<Product_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Public_TestArgs = {
  _inc?: InputMaybe<Public_Test_Inc_Input>;
  _set?: InputMaybe<Public_Test_Set_Input>;
  where: Public_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Public_Test_By_PkArgs = {
  _inc?: InputMaybe<Public_Test_Inc_Input>;
  _set?: InputMaybe<Public_Test_Set_Input>;
  pk_columns: Public_Test_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Public_Test_ManyArgs = {
  updates: Array<Public_Test_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ReservationArgs = {
  _inc?: InputMaybe<Reservation_Inc_Input>;
  _set?: InputMaybe<Reservation_Set_Input>;
  where: Reservation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Reservation_By_PkArgs = {
  _inc?: InputMaybe<Reservation_Inc_Input>;
  _set?: InputMaybe<Reservation_Set_Input>;
  pk_columns: Reservation_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Reservation_ManyArgs = {
  updates: Array<Reservation_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TokenArgs = {
  _inc?: InputMaybe<Token_Inc_Input>;
  _set?: InputMaybe<Token_Set_Input>;
  where: Token_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Token_By_PkArgs = {
  _inc?: InputMaybe<Token_Inc_Input>;
  _set?: InputMaybe<Token_Set_Input>;
  pk_columns: Token_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Token_ManyArgs = {
  updates: Array<Token_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_ManyArgs = {
  updates: Array<User_Updates>;
};

/** columns and relationships of "order" */
export type Order = {
  __typename?: 'order';
  /** An array relationship */
  OrderItems: Array<Order_Item>;
  /** An aggregate relationship */
  OrderItems_aggregate: Order_Item_Aggregate;
  card_number?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  full_name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  ikos_json?: Maybe<Scalars['json']>;
  ikos_order_id?: Maybe<Scalars['String']>;
  /** Kaunas/Vilnius */
  location: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['float8']>;
  table_number?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "order" */
export type OrderOrderItemsArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "order" */
export type OrderOrderItems_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "order" */
export type OrderIkos_JsonArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "order" */
export type Order_Aggregate = {
  __typename?: 'order_aggregate';
  aggregate?: Maybe<Order_Aggregate_Fields>;
  nodes: Array<Order>;
};

/** aggregate fields of "order" */
export type Order_Aggregate_Fields = {
  __typename?: 'order_aggregate_fields';
  avg?: Maybe<Order_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Order_Max_Fields>;
  min?: Maybe<Order_Min_Fields>;
  stddev?: Maybe<Order_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Sum_Fields>;
  var_pop?: Maybe<Order_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Var_Samp_Fields>;
  variance?: Maybe<Order_Variance_Fields>;
};


/** aggregate fields of "order" */
export type Order_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Order_Avg_Fields = {
  __typename?: 'order_avg_fields';
  id?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "order". All fields are combined with a logical 'AND'. */
export type Order_Bool_Exp = {
  OrderItems?: InputMaybe<Order_Item_Bool_Exp>;
  OrderItems_aggregate?: InputMaybe<Order_Item_Aggregate_Bool_Exp>;
  _and?: InputMaybe<Array<Order_Bool_Exp>>;
  _not?: InputMaybe<Order_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Bool_Exp>>;
  card_number?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  full_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  ikos_json?: InputMaybe<Json_Comparison_Exp>;
  ikos_order_id?: InputMaybe<String_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  sum?: InputMaybe<Float8_Comparison_Exp>;
  table_number?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** column ordering options */
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

/** unique or primary key constraints on table "order" */
export type Order_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'order_pkey';

/** input type for incrementing numeric columns in table "order" */
export type Order_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  sum?: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "order" */
export type Order_Insert_Input = {
  OrderItems?: InputMaybe<Order_Item_Arr_Rel_Insert_Input>;
  card_number?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  full_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  ikos_json?: InputMaybe<Scalars['json']>;
  ikos_order_id?: InputMaybe<Scalars['String']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sum?: InputMaybe<Scalars['float8']>;
  table_number?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "order_item" */
export type Order_Item = {
  __typename?: 'order_item';
  /** An object relationship */
  Order?: Maybe<Order>;
  /** An object relationship */
  Product: Product;
  amount?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  ikos_product_id?: Maybe<Scalars['String']>;
  modifiers_json?: Maybe<Scalars['jsonb']>;
  order_id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['float8']>;
  product_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "order_item" */
export type Order_ItemModifiers_JsonArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "order_item" */
export type Order_Item_Aggregate = {
  __typename?: 'order_item_aggregate';
  aggregate?: Maybe<Order_Item_Aggregate_Fields>;
  nodes: Array<Order_Item>;
};

export type Order_Item_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Avg>;
  corr?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Var_Samp>;
};

export type Order_Item_Aggregate_Bool_Exp_Avg = {
  arguments: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Corr = {
  arguments: Order_Item_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Order_Item_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Order_Item_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Order_Item_Aggregate_Bool_Exp_Max = {
  arguments: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Min = {
  arguments: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Sum = {
  arguments: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Order_Item_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "order_item" */
export type Order_Item_Aggregate_Fields = {
  __typename?: 'order_item_aggregate_fields';
  avg?: Maybe<Order_Item_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Order_Item_Max_Fields>;
  min?: Maybe<Order_Item_Min_Fields>;
  stddev?: Maybe<Order_Item_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Item_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Item_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Item_Sum_Fields>;
  var_pop?: Maybe<Order_Item_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Item_Var_Samp_Fields>;
  variance?: Maybe<Order_Item_Variance_Fields>;
};


/** aggregate fields of "order_item" */
export type Order_Item_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "order_item" */
export type Order_Item_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Item_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Item_Max_Order_By>;
  min?: InputMaybe<Order_Item_Min_Order_By>;
  stddev?: InputMaybe<Order_Item_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Item_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Item_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Item_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Item_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Item_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Item_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Order_Item_Append_Input = {
  modifiers_json?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "order_item" */
export type Order_Item_Arr_Rel_Insert_Input = {
  data: Array<Order_Item_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Item_Avg_Fields = {
  __typename?: 'order_item_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "order_item" */
export type Order_Item_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_item". All fields are combined with a logical 'AND'. */
export type Order_Item_Bool_Exp = {
  Order?: InputMaybe<Order_Bool_Exp>;
  Product?: InputMaybe<Product_Bool_Exp>;
  _and?: InputMaybe<Array<Order_Item_Bool_Exp>>;
  _not?: InputMaybe<Order_Item_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Item_Bool_Exp>>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  ikos_product_id?: InputMaybe<String_Comparison_Exp>;
  modifiers_json?: InputMaybe<Jsonb_Comparison_Exp>;
  order_id?: InputMaybe<Int_Comparison_Exp>;
  price?: InputMaybe<Float8_Comparison_Exp>;
  product_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_item" */
export type Order_Item_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'order_item_pkey';

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Order_Item_Delete_At_Path_Input = {
  modifiers_json?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Order_Item_Delete_Elem_Input = {
  modifiers_json?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Order_Item_Delete_Key_Input = {
  modifiers_json?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "order_item" */
export type Order_Item_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  order_id?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['float8']>;
  product_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "order_item" */
export type Order_Item_Insert_Input = {
  Order?: InputMaybe<Order_Obj_Rel_Insert_Input>;
  Product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  amount?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikos_product_id?: InputMaybe<Scalars['String']>;
  modifiers_json?: InputMaybe<Scalars['jsonb']>;
  order_id?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['float8']>;
  product_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Order_Item_Max_Fields = {
  __typename?: 'order_item_max_fields';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikos_product_id?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['float8']>;
  product_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "order_item" */
export type Order_Item_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ikos_product_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Item_Min_Fields = {
  __typename?: 'order_item_min_fields';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikos_product_id?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['float8']>;
  product_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "order_item" */
export type Order_Item_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ikos_product_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_item" */
export type Order_Item_Mutation_Response = {
  __typename?: 'order_item_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Item>;
};

/** on_conflict condition type for table "order_item" */
export type Order_Item_On_Conflict = {
  constraint: Order_Item_Constraint;
  update_columns?: Array<Order_Item_Update_Column>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};

/** Ordering options when selecting data from "order_item". */
export type Order_Item_Order_By = {
  Order?: InputMaybe<Order_Order_By>;
  Product?: InputMaybe<Product_Order_By>;
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ikos_product_id?: InputMaybe<Order_By>;
  modifiers_json?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_item */
export type Order_Item_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Order_Item_Prepend_Input = {
  modifiers_json?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "order_item" */
export type Order_Item_Select_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikos_product_id'
  /** column name */
  | 'modifiers_json'
  /** column name */
  | 'order_id'
  /** column name */
  | 'price'
  /** column name */
  | 'product_id'
  /** column name */
  | 'updated_at';

/** select "order_item_aggregate_bool_exp_avg_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Avg_Arguments_Columns =
  /** column name */
  | 'price';

/** select "order_item_aggregate_bool_exp_corr_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Corr_Arguments_Columns =
  /** column name */
  | 'price';

/** select "order_item_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns =
  /** column name */
  | 'price';

/** select "order_item_aggregate_bool_exp_max_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Max_Arguments_Columns =
  /** column name */
  | 'price';

/** select "order_item_aggregate_bool_exp_min_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Min_Arguments_Columns =
  /** column name */
  | 'price';

/** select "order_item_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns =
  /** column name */
  | 'price';

/** select "order_item_aggregate_bool_exp_sum_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Sum_Arguments_Columns =
  /** column name */
  | 'price';

/** select "order_item_aggregate_bool_exp_var_samp_arguments_columns" columns of table "order_item" */
export type Order_Item_Select_Column_Order_Item_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns =
  /** column name */
  | 'price';

/** input type for updating data in table "order_item" */
export type Order_Item_Set_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikos_product_id?: InputMaybe<Scalars['String']>;
  modifiers_json?: InputMaybe<Scalars['jsonb']>;
  order_id?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['float8']>;
  product_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Order_Item_Stddev_Fields = {
  __typename?: 'order_item_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "order_item" */
export type Order_Item_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Item_Stddev_Pop_Fields = {
  __typename?: 'order_item_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "order_item" */
export type Order_Item_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Item_Stddev_Samp_Fields = {
  __typename?: 'order_item_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "order_item" */
export type Order_Item_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order_item" */
export type Order_Item_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Item_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Item_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikos_product_id?: InputMaybe<Scalars['String']>;
  modifiers_json?: InputMaybe<Scalars['jsonb']>;
  order_id?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['float8']>;
  product_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Order_Item_Sum_Fields = {
  __typename?: 'order_item_sum_fields';
  amount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  order_id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['float8']>;
  product_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "order_item" */
export type Order_Item_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** update columns of table "order_item" */
export type Order_Item_Update_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikos_product_id'
  /** column name */
  | 'modifiers_json'
  /** column name */
  | 'order_id'
  /** column name */
  | 'price'
  /** column name */
  | 'product_id'
  /** column name */
  | 'updated_at';

export type Order_Item_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Order_Item_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Order_Item_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Order_Item_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Order_Item_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Item_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Order_Item_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Item_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Item_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Item_Var_Pop_Fields = {
  __typename?: 'order_item_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "order_item" */
export type Order_Item_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Item_Var_Samp_Fields = {
  __typename?: 'order_item_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "order_item" */
export type Order_Item_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Item_Variance_Fields = {
  __typename?: 'order_item_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "order_item" */
export type Order_Item_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Order_Max_Fields = {
  __typename?: 'order_max_fields';
  card_number?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ikos_order_id?: Maybe<Scalars['String']>;
  /** Kaunas/Vilnius */
  location?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['float8']>;
  table_number?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Order_Min_Fields = {
  __typename?: 'order_min_fields';
  card_number?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ikos_order_id?: Maybe<Scalars['String']>;
  /** Kaunas/Vilnius */
  location?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['float8']>;
  table_number?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "order" */
export type Order_Mutation_Response = {
  __typename?: 'order_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Order>;
};

/** input type for inserting object relation for remote table "order" */
export type Order_Obj_Rel_Insert_Input = {
  data: Order_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** on_conflict condition type for table "order" */
export type Order_On_Conflict = {
  constraint: Order_Constraint;
  update_columns?: Array<Order_Update_Column>;
  where?: InputMaybe<Order_Bool_Exp>;
};

/** Ordering options when selecting data from "order". */
export type Order_Order_By = {
  OrderItems_aggregate?: InputMaybe<Order_Item_Aggregate_Order_By>;
  card_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ikos_json?: InputMaybe<Order_By>;
  ikos_order_id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  sum?: InputMaybe<Order_By>;
  table_number?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order */
export type Order_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "order" */
export type Order_Select_Column =
  /** column name */
  | 'card_number'
  /** column name */
  | 'created_at'
  /** column name */
  | 'full_name'
  /** column name */
  | 'id'
  /** column name */
  | 'ikos_json'
  /** column name */
  | 'ikos_order_id'
  /** column name */
  | 'location'
  /** column name */
  | 'phone'
  /** column name */
  | 'sum'
  /** column name */
  | 'table_number'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "order" */
export type Order_Set_Input = {
  card_number?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  full_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  ikos_json?: InputMaybe<Scalars['json']>;
  ikos_order_id?: InputMaybe<Scalars['String']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sum?: InputMaybe<Scalars['float8']>;
  table_number?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Order_Stddev_Fields = {
  __typename?: 'order_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Order_Stddev_Pop_Fields = {
  __typename?: 'order_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Order_Stddev_Samp_Fields = {
  __typename?: 'order_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "order" */
export type Order_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Stream_Cursor_Value_Input = {
  card_number?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  full_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  ikos_json?: InputMaybe<Scalars['json']>;
  ikos_order_id?: InputMaybe<Scalars['String']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sum?: InputMaybe<Scalars['float8']>;
  table_number?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Order_Sum_Fields = {
  __typename?: 'order_sum_fields';
  id?: Maybe<Scalars['Int']>;
  sum?: Maybe<Scalars['float8']>;
};

/** update columns of table "order" */
export type Order_Update_Column =
  /** column name */
  | 'card_number'
  /** column name */
  | 'created_at'
  /** column name */
  | 'full_name'
  /** column name */
  | 'id'
  /** column name */
  | 'ikos_json'
  /** column name */
  | 'ikos_order_id'
  /** column name */
  | 'location'
  /** column name */
  | 'phone'
  /** column name */
  | 'sum'
  /** column name */
  | 'table_number'
  /** column name */
  | 'updated_at';

export type Order_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Var_Pop_Fields = {
  __typename?: 'order_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Order_Var_Samp_Fields = {
  __typename?: 'order_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Order_Variance_Fields = {
  __typename?: 'order_variance_fields';
  id?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "product" */
export type Product = {
  __typename?: 'product';
  /** An array relationship */
  OrderItems: Array<Order_Item>;
  /** An aggregate relationship */
  OrderItems_aggregate: Order_Item_Aggregate;
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['Int'];
  ikko_id?: Maybe<Scalars['String']>;
  ikos_group_id?: Maybe<Scalars['String']>;
  ikos_parent_group_id?: Maybe<Scalars['String']>;
  ikos_product_json?: Maybe<Scalars['json']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['float8']>;
  updated_at: Scalars['timestamptz'];
  weight?: Maybe<Scalars['float8']>;
};


/** columns and relationships of "product" */
export type ProductOrderItemsArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductOrderItems_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductIkos_Product_JsonArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "product" */
export type Product_Aggregate = {
  __typename?: 'product_aggregate';
  aggregate?: Maybe<Product_Aggregate_Fields>;
  nodes: Array<Product>;
};

/** aggregate fields of "product" */
export type Product_Aggregate_Fields = {
  __typename?: 'product_aggregate_fields';
  avg?: Maybe<Product_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Product_Max_Fields>;
  min?: Maybe<Product_Min_Fields>;
  stddev?: Maybe<Product_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Sum_Fields>;
  var_pop?: Maybe<Product_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Var_Samp_Fields>;
  variance?: Maybe<Product_Variance_Fields>;
};


/** aggregate fields of "product" */
export type Product_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Product_Avg_Fields = {
  __typename?: 'product_avg_fields';
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "product". All fields are combined with a logical 'AND'. */
export type Product_Bool_Exp = {
  OrderItems?: InputMaybe<Order_Item_Bool_Exp>;
  OrderItems_aggregate?: InputMaybe<Order_Item_Aggregate_Bool_Exp>;
  _and?: InputMaybe<Array<Product_Bool_Exp>>;
  _not?: InputMaybe<Product_Bool_Exp>;
  _or?: InputMaybe<Array<Product_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  ikko_id?: InputMaybe<String_Comparison_Exp>;
  ikos_group_id?: InputMaybe<String_Comparison_Exp>;
  ikos_parent_group_id?: InputMaybe<String_Comparison_Exp>;
  ikos_product_json?: InputMaybe<Json_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_id?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Float8_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  weight?: InputMaybe<Float8_Comparison_Exp>;
};

/** columns and relationships of "product_category" */
export type Product_Category = {
  __typename?: 'product_category';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['Int'];
  ikko_id: Scalars['String'];
  ikko_product_category_json: Scalars['json'];
  is_included_in_menu: Scalars['Boolean'];
  location: Scalars['String'];
  name: Scalars['String'];
  organization_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "product_category" */
export type Product_CategoryIkko_Product_Category_JsonArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "product_category" */
export type Product_Category_Aggregate = {
  __typename?: 'product_category_aggregate';
  aggregate?: Maybe<Product_Category_Aggregate_Fields>;
  nodes: Array<Product_Category>;
};

/** aggregate fields of "product_category" */
export type Product_Category_Aggregate_Fields = {
  __typename?: 'product_category_aggregate_fields';
  avg?: Maybe<Product_Category_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Product_Category_Max_Fields>;
  min?: Maybe<Product_Category_Min_Fields>;
  stddev?: Maybe<Product_Category_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Category_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Category_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Category_Sum_Fields>;
  var_pop?: Maybe<Product_Category_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Category_Var_Samp_Fields>;
  variance?: Maybe<Product_Category_Variance_Fields>;
};


/** aggregate fields of "product_category" */
export type Product_Category_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Product_Category_Avg_Fields = {
  __typename?: 'product_category_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "product_category". All fields are combined with a logical 'AND'. */
export type Product_Category_Bool_Exp = {
  _and?: InputMaybe<Array<Product_Category_Bool_Exp>>;
  _not?: InputMaybe<Product_Category_Bool_Exp>;
  _or?: InputMaybe<Array<Product_Category_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  ikko_id?: InputMaybe<String_Comparison_Exp>;
  ikko_product_category_json?: InputMaybe<Json_Comparison_Exp>;
  is_included_in_menu?: InputMaybe<Boolean_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_category" */
export type Product_Category_Constraint =
  /** unique or primary key constraint on columns "ikko_id" */
  | 'product_categorie_ikko_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'product_categorie_pkey';

/** input type for incrementing numeric columns in table "product_category" */
export type Product_Category_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_category" */
export type Product_Category_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikko_product_category_json?: InputMaybe<Scalars['json']>;
  is_included_in_menu?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Product_Category_Max_Fields = {
  __typename?: 'product_category_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikko_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Product_Category_Min_Fields = {
  __typename?: 'product_category_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikko_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "product_category" */
export type Product_Category_Mutation_Response = {
  __typename?: 'product_category_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Category>;
};

/** on_conflict condition type for table "product_category" */
export type Product_Category_On_Conflict = {
  constraint: Product_Category_Constraint;
  update_columns?: Array<Product_Category_Update_Column>;
  where?: InputMaybe<Product_Category_Bool_Exp>;
};

/** Ordering options when selecting data from "product_category". */
export type Product_Category_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ikko_id?: InputMaybe<Order_By>;
  ikko_product_category_json?: InputMaybe<Order_By>;
  is_included_in_menu?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: product_category */
export type Product_Category_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "product_category" */
export type Product_Category_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikko_id'
  /** column name */
  | 'ikko_product_category_json'
  /** column name */
  | 'is_included_in_menu'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'organization_id'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "product_category" */
export type Product_Category_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikko_product_category_json?: InputMaybe<Scalars['json']>;
  is_included_in_menu?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Product_Category_Stddev_Fields = {
  __typename?: 'product_category_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Product_Category_Stddev_Pop_Fields = {
  __typename?: 'product_category_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Product_Category_Stddev_Samp_Fields = {
  __typename?: 'product_category_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "product_category" */
export type Product_Category_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Product_Category_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Product_Category_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikko_product_category_json?: InputMaybe<Scalars['json']>;
  is_included_in_menu?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Product_Category_Sum_Fields = {
  __typename?: 'product_category_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "product_category" */
export type Product_Category_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikko_id'
  /** column name */
  | 'ikko_product_category_json'
  /** column name */
  | 'is_included_in_menu'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'organization_id'
  /** column name */
  | 'updated_at';

export type Product_Category_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Product_Category_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Product_Category_Set_Input>;
  /** filter the rows which have to be updated */
  where: Product_Category_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Product_Category_Var_Pop_Fields = {
  __typename?: 'product_category_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Product_Category_Var_Samp_Fields = {
  __typename?: 'product_category_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Product_Category_Variance_Fields = {
  __typename?: 'product_category_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** unique or primary key constraints on table "product" */
export type Product_Constraint =
  /** unique or primary key constraint on columns "ikko_id" */
  | 'product_ikko_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'product_pkey';

/** input type for incrementing numeric columns in table "product" */
export type Product_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['float8']>;
  weight?: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "product" */
export type Product_Insert_Input = {
  OrderItems?: InputMaybe<Order_Item_Arr_Rel_Insert_Input>;
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikos_group_id?: InputMaybe<Scalars['String']>;
  ikos_parent_group_id?: InputMaybe<Scalars['String']>;
  ikos_product_json?: InputMaybe<Scalars['json']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['float8']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weight?: InputMaybe<Scalars['float8']>;
};

/** aggregate max on columns */
export type Product_Max_Fields = {
  __typename?: 'product_max_fields';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikko_id?: Maybe<Scalars['String']>;
  ikos_group_id?: Maybe<Scalars['String']>;
  ikos_parent_group_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['float8']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weight?: Maybe<Scalars['float8']>;
};

/** aggregate min on columns */
export type Product_Min_Fields = {
  __typename?: 'product_min_fields';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  ikko_id?: Maybe<Scalars['String']>;
  ikos_group_id?: Maybe<Scalars['String']>;
  ikos_parent_group_id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['float8']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weight?: Maybe<Scalars['float8']>;
};

/** response of any mutation on the table "product" */
export type Product_Mutation_Response = {
  __typename?: 'product_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product>;
};

/** input type for inserting object relation for remote table "product" */
export type Product_Obj_Rel_Insert_Input = {
  data: Product_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Product_On_Conflict>;
};

/** on_conflict condition type for table "product" */
export type Product_On_Conflict = {
  constraint: Product_Constraint;
  update_columns?: Array<Product_Update_Column>;
  where?: InputMaybe<Product_Bool_Exp>;
};

/** Ordering options when selecting data from "product". */
export type Product_Order_By = {
  OrderItems_aggregate?: InputMaybe<Order_Item_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ikko_id?: InputMaybe<Order_By>;
  ikos_group_id?: InputMaybe<Order_By>;
  ikos_parent_group_id?: InputMaybe<Order_By>;
  ikos_product_json?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** primary key columns input for table: product */
export type Product_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "product" */
export type Product_Select_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikko_id'
  /** column name */
  | 'ikos_group_id'
  /** column name */
  | 'ikos_parent_group_id'
  /** column name */
  | 'ikos_product_json'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'organization_id'
  /** column name */
  | 'price'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'weight';

/** input type for updating data in table "product" */
export type Product_Set_Input = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikos_group_id?: InputMaybe<Scalars['String']>;
  ikos_parent_group_id?: InputMaybe<Scalars['String']>;
  ikos_product_json?: InputMaybe<Scalars['json']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['float8']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weight?: InputMaybe<Scalars['float8']>;
};

/** aggregate stddev on columns */
export type Product_Stddev_Fields = {
  __typename?: 'product_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Product_Stddev_Pop_Fields = {
  __typename?: 'product_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Product_Stddev_Samp_Fields = {
  __typename?: 'product_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "product" */
export type Product_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Product_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Product_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  ikko_id?: InputMaybe<Scalars['String']>;
  ikos_group_id?: InputMaybe<Scalars['String']>;
  ikos_parent_group_id?: InputMaybe<Scalars['String']>;
  ikos_product_json?: InputMaybe<Scalars['json']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['float8']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weight?: InputMaybe<Scalars['float8']>;
};

/** aggregate sum on columns */
export type Product_Sum_Fields = {
  __typename?: 'product_sum_fields';
  id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['float8']>;
  weight?: Maybe<Scalars['float8']>;
};

/** update columns of table "product" */
export type Product_Update_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ikko_id'
  /** column name */
  | 'ikos_group_id'
  /** column name */
  | 'ikos_parent_group_id'
  /** column name */
  | 'ikos_product_json'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'organization_id'
  /** column name */
  | 'price'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'weight';

export type Product_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Product_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Product_Set_Input>;
  /** filter the rows which have to be updated */
  where: Product_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Product_Var_Pop_Fields = {
  __typename?: 'product_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Product_Var_Samp_Fields = {
  __typename?: 'product_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Product_Variance_Fields = {
  __typename?: 'product_variance_fields';
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "public_test" */
export type Public_Test = {
  __typename?: 'public_test';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** aggregated selection of "public_test" */
export type Public_Test_Aggregate = {
  __typename?: 'public_test_aggregate';
  aggregate?: Maybe<Public_Test_Aggregate_Fields>;
  nodes: Array<Public_Test>;
};

/** aggregate fields of "public_test" */
export type Public_Test_Aggregate_Fields = {
  __typename?: 'public_test_aggregate_fields';
  avg?: Maybe<Public_Test_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Public_Test_Max_Fields>;
  min?: Maybe<Public_Test_Min_Fields>;
  stddev?: Maybe<Public_Test_Stddev_Fields>;
  stddev_pop?: Maybe<Public_Test_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Public_Test_Stddev_Samp_Fields>;
  sum?: Maybe<Public_Test_Sum_Fields>;
  var_pop?: Maybe<Public_Test_Var_Pop_Fields>;
  var_samp?: Maybe<Public_Test_Var_Samp_Fields>;
  variance?: Maybe<Public_Test_Variance_Fields>;
};


/** aggregate fields of "public_test" */
export type Public_Test_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Public_Test_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Public_Test_Avg_Fields = {
  __typename?: 'public_test_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "public_test". All fields are combined with a logical 'AND'. */
export type Public_Test_Bool_Exp = {
  _and?: InputMaybe<Array<Public_Test_Bool_Exp>>;
  _not?: InputMaybe<Public_Test_Bool_Exp>;
  _or?: InputMaybe<Array<Public_Test_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "public_test" */
export type Public_Test_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'public_test_pkey';

/** input type for incrementing numeric columns in table "public_test" */
export type Public_Test_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "public_test" */
export type Public_Test_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Public_Test_Max_Fields = {
  __typename?: 'public_test_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Public_Test_Min_Fields = {
  __typename?: 'public_test_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "public_test" */
export type Public_Test_Mutation_Response = {
  __typename?: 'public_test_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Public_Test>;
};

/** on_conflict condition type for table "public_test" */
export type Public_Test_On_Conflict = {
  constraint: Public_Test_Constraint;
  update_columns?: Array<Public_Test_Update_Column>;
  where?: InputMaybe<Public_Test_Bool_Exp>;
};

/** Ordering options when selecting data from "public_test". */
export type Public_Test_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: public_test */
export type Public_Test_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "public_test" */
export type Public_Test_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'name';

/** input type for updating data in table "public_test" */
export type Public_Test_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Public_Test_Stddev_Fields = {
  __typename?: 'public_test_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Public_Test_Stddev_Pop_Fields = {
  __typename?: 'public_test_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Public_Test_Stddev_Samp_Fields = {
  __typename?: 'public_test_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "public_test" */
export type Public_Test_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Public_Test_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Public_Test_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Public_Test_Sum_Fields = {
  __typename?: 'public_test_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "public_test" */
export type Public_Test_Update_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'name';

export type Public_Test_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Public_Test_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Public_Test_Set_Input>;
  /** filter the rows which have to be updated */
  where: Public_Test_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Public_Test_Var_Pop_Fields = {
  __typename?: 'public_test_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Public_Test_Var_Samp_Fields = {
  __typename?: 'public_test_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Public_Test_Variance_Fields = {
  __typename?: 'public_test_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "blocked_time" */
  blocked_time: Array<Blocked_Time>;
  /** fetch aggregated fields from the table: "blocked_time" */
  blocked_time_aggregate: Blocked_Time_Aggregate;
  /** fetch data from the table: "blocked_time" using primary key columns */
  blocked_time_by_pk?: Maybe<Blocked_Time>;
  /** fetch data from the table: "group" */
  group: Array<Group>;
  /** fetch aggregated fields from the table: "group" */
  group_aggregate: Group_Aggregate;
  /** fetch data from the table: "group" using primary key columns */
  group_by_pk?: Maybe<Group>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** fetch data from the table: "order_item" */
  order_item: Array<Order_Item>;
  /** fetch aggregated fields from the table: "order_item" */
  order_item_aggregate: Order_Item_Aggregate;
  /** fetch data from the table: "order_item" using primary key columns */
  order_item_by_pk?: Maybe<Order_Item>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
  /** fetch data from the table: "product_category" */
  product_category: Array<Product_Category>;
  /** fetch aggregated fields from the table: "product_category" */
  product_category_aggregate: Product_Category_Aggregate;
  /** fetch data from the table: "product_category" using primary key columns */
  product_category_by_pk?: Maybe<Product_Category>;
  /** fetch data from the table: "public_test" */
  public_test: Array<Public_Test>;
  /** fetch aggregated fields from the table: "public_test" */
  public_test_aggregate: Public_Test_Aggregate;
  /** fetch data from the table: "public_test" using primary key columns */
  public_test_by_pk?: Maybe<Public_Test>;
  /** fetch data from the table: "reservation" */
  reservation: Array<Reservation>;
  /** fetch aggregated fields from the table: "reservation" */
  reservation_aggregate: Reservation_Aggregate;
  /** fetch data from the table: "reservation" using primary key columns */
  reservation_by_pk?: Maybe<Reservation>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  token_by_pk?: Maybe<Token>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Query_RootBlocked_TimeArgs = {
  distinct_on?: InputMaybe<Array<Blocked_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Blocked_Time_Order_By>>;
  where?: InputMaybe<Blocked_Time_Bool_Exp>;
};


export type Query_RootBlocked_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blocked_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Blocked_Time_Order_By>>;
  where?: InputMaybe<Blocked_Time_Bool_Exp>;
};


export type Query_RootBlocked_Time_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootGroupArgs = {
  distinct_on?: InputMaybe<Array<Group_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Group_Order_By>>;
  where?: InputMaybe<Group_Bool_Exp>;
};


export type Query_RootGroup_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Group_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Group_Order_By>>;
  where?: InputMaybe<Group_Bool_Exp>;
};


export type Query_RootGroup_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Query_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Query_RootOrder_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootOrder_ItemArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Query_RootOrder_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Query_RootOrder_Item_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootProductArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Query_RootProduct_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Query_RootProduct_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootProduct_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Product_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Category_Order_By>>;
  where?: InputMaybe<Product_Category_Bool_Exp>;
};


export type Query_RootProduct_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Category_Order_By>>;
  where?: InputMaybe<Product_Category_Bool_Exp>;
};


export type Query_RootProduct_Category_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPublic_TestArgs = {
  distinct_on?: InputMaybe<Array<Public_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Public_Test_Order_By>>;
  where?: InputMaybe<Public_Test_Bool_Exp>;
};


export type Query_RootPublic_Test_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Public_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Public_Test_Order_By>>;
  where?: InputMaybe<Public_Test_Bool_Exp>;
};


export type Query_RootPublic_Test_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootReservationArgs = {
  distinct_on?: InputMaybe<Array<Reservation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reservation_Order_By>>;
  where?: InputMaybe<Reservation_Bool_Exp>;
};


export type Query_RootReservation_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reservation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reservation_Order_By>>;
  where?: InputMaybe<Reservation_Bool_Exp>;
};


export type Query_RootReservation_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Query_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Query_RootToken_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "reservation" */
export type Reservation = {
  __typename?: 'reservation';
  comment?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  dart?: Maybe<Scalars['Boolean']>;
  date_number?: Maybe<Scalars['Int']>;
  date_time?: Maybe<Scalars['timestamptz']>;
  day_time?: Maybe<Scalars['String']>;
  /** minutes */
  duration?: Maybe<Scalars['String']>;
  eat?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  is_tournament?: Maybe<Scalars['Boolean']>;
  /** Kaunas/Vilnius */
  location: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  number_of_people?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  pool?: Maybe<Scalars['Boolean']>;
  /** just-play, group */
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "reservation" */
export type Reservation_Aggregate = {
  __typename?: 'reservation_aggregate';
  aggregate?: Maybe<Reservation_Aggregate_Fields>;
  nodes: Array<Reservation>;
};

/** aggregate fields of "reservation" */
export type Reservation_Aggregate_Fields = {
  __typename?: 'reservation_aggregate_fields';
  avg?: Maybe<Reservation_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Reservation_Max_Fields>;
  min?: Maybe<Reservation_Min_Fields>;
  stddev?: Maybe<Reservation_Stddev_Fields>;
  stddev_pop?: Maybe<Reservation_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Reservation_Stddev_Samp_Fields>;
  sum?: Maybe<Reservation_Sum_Fields>;
  var_pop?: Maybe<Reservation_Var_Pop_Fields>;
  var_samp?: Maybe<Reservation_Var_Samp_Fields>;
  variance?: Maybe<Reservation_Variance_Fields>;
};


/** aggregate fields of "reservation" */
export type Reservation_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Reservation_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Reservation_Avg_Fields = {
  __typename?: 'reservation_avg_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  number_of_people?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "reservation". All fields are combined with a logical 'AND'. */
export type Reservation_Bool_Exp = {
  _and?: InputMaybe<Array<Reservation_Bool_Exp>>;
  _not?: InputMaybe<Reservation_Bool_Exp>;
  _or?: InputMaybe<Array<Reservation_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  company_name?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dart?: InputMaybe<Boolean_Comparison_Exp>;
  date_number?: InputMaybe<Int_Comparison_Exp>;
  date_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  day_time?: InputMaybe<String_Comparison_Exp>;
  duration?: InputMaybe<String_Comparison_Exp>;
  eat?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_tournament?: InputMaybe<Boolean_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  number_of_people?: InputMaybe<Int_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  pool?: InputMaybe<Boolean_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "reservation" */
export type Reservation_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'reservation_pkey';

/** input type for incrementing numeric columns in table "reservation" */
export type Reservation_Inc_Input = {
  date_number?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  number_of_people?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "reservation" */
export type Reservation_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  dart?: InputMaybe<Scalars['Boolean']>;
  date_number?: InputMaybe<Scalars['Int']>;
  date_time?: InputMaybe<Scalars['timestamptz']>;
  day_time?: InputMaybe<Scalars['String']>;
  /** minutes */
  duration?: InputMaybe<Scalars['String']>;
  eat?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  is_tournament?: InputMaybe<Scalars['Boolean']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  number_of_people?: InputMaybe<Scalars['Int']>;
  phone?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['Boolean']>;
  /** just-play, group */
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Reservation_Max_Fields = {
  __typename?: 'reservation_max_fields';
  comment?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  date_number?: Maybe<Scalars['Int']>;
  date_time?: Maybe<Scalars['timestamptz']>;
  day_time?: Maybe<Scalars['String']>;
  /** minutes */
  duration?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  /** Kaunas/Vilnius */
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  number_of_people?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  /** just-play, group */
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Reservation_Min_Fields = {
  __typename?: 'reservation_min_fields';
  comment?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  date_number?: Maybe<Scalars['Int']>;
  date_time?: Maybe<Scalars['timestamptz']>;
  day_time?: Maybe<Scalars['String']>;
  /** minutes */
  duration?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  /** Kaunas/Vilnius */
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  number_of_people?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  /** just-play, group */
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "reservation" */
export type Reservation_Mutation_Response = {
  __typename?: 'reservation_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Reservation>;
};

/** on_conflict condition type for table "reservation" */
export type Reservation_On_Conflict = {
  constraint: Reservation_Constraint;
  update_columns?: Array<Reservation_Update_Column>;
  where?: InputMaybe<Reservation_Bool_Exp>;
};

/** Ordering options when selecting data from "reservation". */
export type Reservation_Order_By = {
  comment?: InputMaybe<Order_By>;
  company_name?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dart?: InputMaybe<Order_By>;
  date_number?: InputMaybe<Order_By>;
  date_time?: InputMaybe<Order_By>;
  day_time?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  eat?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_tournament?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  number_of_people?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  pool?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: reservation */
export type Reservation_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "reservation" */
export type Reservation_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'company_name'
  /** column name */
  | 'created_at'
  /** column name */
  | 'dart'
  /** column name */
  | 'date_number'
  /** column name */
  | 'date_time'
  /** column name */
  | 'day_time'
  /** column name */
  | 'duration'
  /** column name */
  | 'eat'
  /** column name */
  | 'id'
  /** column name */
  | 'is_tournament'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'number_of_people'
  /** column name */
  | 'phone'
  /** column name */
  | 'pool'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "reservation" */
export type Reservation_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  dart?: InputMaybe<Scalars['Boolean']>;
  date_number?: InputMaybe<Scalars['Int']>;
  date_time?: InputMaybe<Scalars['timestamptz']>;
  day_time?: InputMaybe<Scalars['String']>;
  /** minutes */
  duration?: InputMaybe<Scalars['String']>;
  eat?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  is_tournament?: InputMaybe<Scalars['Boolean']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  number_of_people?: InputMaybe<Scalars['Int']>;
  phone?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['Boolean']>;
  /** just-play, group */
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Reservation_Stddev_Fields = {
  __typename?: 'reservation_stddev_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  number_of_people?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Reservation_Stddev_Pop_Fields = {
  __typename?: 'reservation_stddev_pop_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  number_of_people?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Reservation_Stddev_Samp_Fields = {
  __typename?: 'reservation_stddev_samp_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  number_of_people?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "reservation" */
export type Reservation_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Reservation_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Reservation_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  dart?: InputMaybe<Scalars['Boolean']>;
  date_number?: InputMaybe<Scalars['Int']>;
  date_time?: InputMaybe<Scalars['timestamptz']>;
  day_time?: InputMaybe<Scalars['String']>;
  /** minutes */
  duration?: InputMaybe<Scalars['String']>;
  eat?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  is_tournament?: InputMaybe<Scalars['Boolean']>;
  /** Kaunas/Vilnius */
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  number_of_people?: InputMaybe<Scalars['Int']>;
  phone?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['Boolean']>;
  /** just-play, group */
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Reservation_Sum_Fields = {
  __typename?: 'reservation_sum_fields';
  date_number?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  number_of_people?: Maybe<Scalars['Int']>;
};

/** update columns of table "reservation" */
export type Reservation_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'company_name'
  /** column name */
  | 'created_at'
  /** column name */
  | 'dart'
  /** column name */
  | 'date_number'
  /** column name */
  | 'date_time'
  /** column name */
  | 'day_time'
  /** column name */
  | 'duration'
  /** column name */
  | 'eat'
  /** column name */
  | 'id'
  /** column name */
  | 'is_tournament'
  /** column name */
  | 'location'
  /** column name */
  | 'name'
  /** column name */
  | 'number_of_people'
  /** column name */
  | 'phone'
  /** column name */
  | 'pool'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

export type Reservation_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Reservation_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Reservation_Set_Input>;
  /** filter the rows which have to be updated */
  where: Reservation_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Reservation_Var_Pop_Fields = {
  __typename?: 'reservation_var_pop_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  number_of_people?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Reservation_Var_Samp_Fields = {
  __typename?: 'reservation_var_samp_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  number_of_people?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Reservation_Variance_Fields = {
  __typename?: 'reservation_variance_fields';
  date_number?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  number_of_people?: Maybe<Scalars['Float']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "blocked_time" */
  blocked_time: Array<Blocked_Time>;
  /** fetch aggregated fields from the table: "blocked_time" */
  blocked_time_aggregate: Blocked_Time_Aggregate;
  /** fetch data from the table: "blocked_time" using primary key columns */
  blocked_time_by_pk?: Maybe<Blocked_Time>;
  /** fetch data from the table in a streaming manner: "blocked_time" */
  blocked_time_stream: Array<Blocked_Time>;
  /** fetch data from the table: "group" */
  group: Array<Group>;
  /** fetch aggregated fields from the table: "group" */
  group_aggregate: Group_Aggregate;
  /** fetch data from the table: "group" using primary key columns */
  group_by_pk?: Maybe<Group>;
  /** fetch data from the table in a streaming manner: "group" */
  group_stream: Array<Group>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** fetch data from the table: "order_item" */
  order_item: Array<Order_Item>;
  /** fetch aggregated fields from the table: "order_item" */
  order_item_aggregate: Order_Item_Aggregate;
  /** fetch data from the table: "order_item" using primary key columns */
  order_item_by_pk?: Maybe<Order_Item>;
  /** fetch data from the table in a streaming manner: "order_item" */
  order_item_stream: Array<Order_Item>;
  /** fetch data from the table in a streaming manner: "order" */
  order_stream: Array<Order>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
  /** fetch data from the table: "product_category" */
  product_category: Array<Product_Category>;
  /** fetch aggregated fields from the table: "product_category" */
  product_category_aggregate: Product_Category_Aggregate;
  /** fetch data from the table: "product_category" using primary key columns */
  product_category_by_pk?: Maybe<Product_Category>;
  /** fetch data from the table in a streaming manner: "product_category" */
  product_category_stream: Array<Product_Category>;
  /** fetch data from the table in a streaming manner: "product" */
  product_stream: Array<Product>;
  /** fetch data from the table: "public_test" */
  public_test: Array<Public_Test>;
  /** fetch aggregated fields from the table: "public_test" */
  public_test_aggregate: Public_Test_Aggregate;
  /** fetch data from the table: "public_test" using primary key columns */
  public_test_by_pk?: Maybe<Public_Test>;
  /** fetch data from the table in a streaming manner: "public_test" */
  public_test_stream: Array<Public_Test>;
  /** fetch data from the table: "reservation" */
  reservation: Array<Reservation>;
  /** fetch aggregated fields from the table: "reservation" */
  reservation_aggregate: Reservation_Aggregate;
  /** fetch data from the table: "reservation" using primary key columns */
  reservation_by_pk?: Maybe<Reservation>;
  /** fetch data from the table in a streaming manner: "reservation" */
  reservation_stream: Array<Reservation>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  token_by_pk?: Maybe<Token>;
  /** fetch data from the table in a streaming manner: "token" */
  token_stream: Array<Token>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "user" */
  user_stream: Array<User>;
};


export type Subscription_RootBlocked_TimeArgs = {
  distinct_on?: InputMaybe<Array<Blocked_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Blocked_Time_Order_By>>;
  where?: InputMaybe<Blocked_Time_Bool_Exp>;
};


export type Subscription_RootBlocked_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blocked_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Blocked_Time_Order_By>>;
  where?: InputMaybe<Blocked_Time_Bool_Exp>;
};


export type Subscription_RootBlocked_Time_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootBlocked_Time_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Blocked_Time_Stream_Cursor_Input>>;
  where?: InputMaybe<Blocked_Time_Bool_Exp>;
};


export type Subscription_RootGroupArgs = {
  distinct_on?: InputMaybe<Array<Group_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Group_Order_By>>;
  where?: InputMaybe<Group_Bool_Exp>;
};


export type Subscription_RootGroup_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Group_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Group_Order_By>>;
  where?: InputMaybe<Group_Bool_Exp>;
};


export type Subscription_RootGroup_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootGroup_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Group_Stream_Cursor_Input>>;
  where?: InputMaybe<Group_Bool_Exp>;
};


export type Subscription_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootOrder_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootOrder_ItemArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Subscription_RootOrder_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Subscription_RootOrder_Item_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootOrder_Item_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Order_Item_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Subscription_RootOrder_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Order_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootProductArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootProduct_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootProduct_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootProduct_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Product_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Category_Order_By>>;
  where?: InputMaybe<Product_Category_Bool_Exp>;
};


export type Subscription_RootProduct_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Product_Category_Order_By>>;
  where?: InputMaybe<Product_Category_Bool_Exp>;
};


export type Subscription_RootProduct_Category_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootProduct_Category_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Product_Category_Stream_Cursor_Input>>;
  where?: InputMaybe<Product_Category_Bool_Exp>;
};


export type Subscription_RootProduct_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Product_Stream_Cursor_Input>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootPublic_TestArgs = {
  distinct_on?: InputMaybe<Array<Public_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Public_Test_Order_By>>;
  where?: InputMaybe<Public_Test_Bool_Exp>;
};


export type Subscription_RootPublic_Test_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Public_Test_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Public_Test_Order_By>>;
  where?: InputMaybe<Public_Test_Bool_Exp>;
};


export type Subscription_RootPublic_Test_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPublic_Test_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Public_Test_Stream_Cursor_Input>>;
  where?: InputMaybe<Public_Test_Bool_Exp>;
};


export type Subscription_RootReservationArgs = {
  distinct_on?: InputMaybe<Array<Reservation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reservation_Order_By>>;
  where?: InputMaybe<Reservation_Bool_Exp>;
};


export type Subscription_RootReservation_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reservation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Reservation_Order_By>>;
  where?: InputMaybe<Reservation_Bool_Exp>;
};


export type Subscription_RootReservation_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootReservation_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Reservation_Stream_Cursor_Input>>;
  where?: InputMaybe<Reservation_Bool_Exp>;
};


export type Subscription_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Subscription_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Subscription_RootToken_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootToken_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Token_Stream_Cursor_Input>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "token" */
export type Token = {
  __typename?: 'token';
  /** An object relationship */
  User: User;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  token: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['Int'];
};

/** aggregated selection of "token" */
export type Token_Aggregate = {
  __typename?: 'token_aggregate';
  aggregate?: Maybe<Token_Aggregate_Fields>;
  nodes: Array<Token>;
};

export type Token_Aggregate_Bool_Exp = {
  count?: InputMaybe<Token_Aggregate_Bool_Exp_Count>;
};

export type Token_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Token_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "token" */
export type Token_Aggregate_Fields = {
  __typename?: 'token_aggregate_fields';
  avg?: Maybe<Token_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Token_Max_Fields>;
  min?: Maybe<Token_Min_Fields>;
  stddev?: Maybe<Token_Stddev_Fields>;
  stddev_pop?: Maybe<Token_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Token_Stddev_Samp_Fields>;
  sum?: Maybe<Token_Sum_Fields>;
  var_pop?: Maybe<Token_Var_Pop_Fields>;
  var_samp?: Maybe<Token_Var_Samp_Fields>;
  variance?: Maybe<Token_Variance_Fields>;
};


/** aggregate fields of "token" */
export type Token_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "token" */
export type Token_Aggregate_Order_By = {
  avg?: InputMaybe<Token_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Max_Order_By>;
  min?: InputMaybe<Token_Min_Order_By>;
  stddev?: InputMaybe<Token_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Token_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Token_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Token_Sum_Order_By>;
  var_pop?: InputMaybe<Token_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Token_Var_Samp_Order_By>;
  variance?: InputMaybe<Token_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "token" */
export type Token_Arr_Rel_Insert_Input = {
  data: Array<Token_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** aggregate avg on columns */
export type Token_Avg_Fields = {
  __typename?: 'token_avg_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "token" */
export type Token_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "token". All fields are combined with a logical 'AND'. */
export type Token_Bool_Exp = {
  User?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<Token_Bool_Exp>>;
  _not?: InputMaybe<Token_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "token" */
export type Token_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'token_pkey';

/** input type for incrementing numeric columns in table "token" */
export type Token_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "token" */
export type Token_Insert_Input = {
  User?: InputMaybe<User_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Token_Max_Fields = {
  __typename?: 'token_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "token" */
export type Token_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Min_Fields = {
  __typename?: 'token_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "token" */
export type Token_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "token" */
export type Token_Mutation_Response = {
  __typename?: 'token_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Token>;
};

/** on_conflict condition type for table "token" */
export type Token_On_Conflict = {
  constraint: Token_Constraint;
  update_columns?: Array<Token_Update_Column>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** Ordering options when selecting data from "token". */
export type Token_Order_By = {
  User?: InputMaybe<User_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: token */
export type Token_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "token" */
export type Token_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'token'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "token" */
export type Token_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Token_Stddev_Fields = {
  __typename?: 'token_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "token" */
export type Token_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Token_Stddev_Pop_Fields = {
  __typename?: 'token_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "token" */
export type Token_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Token_Stddev_Samp_Fields = {
  __typename?: 'token_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "token" */
export type Token_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "token" */
export type Token_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Token_Sum_Fields = {
  __typename?: 'token_sum_fields';
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "token" */
export type Token_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** update columns of table "token" */
export type Token_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'token'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Token_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Token_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Token_Set_Input>;
  /** filter the rows which have to be updated */
  where: Token_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Token_Var_Pop_Fields = {
  __typename?: 'token_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "token" */
export type Token_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Token_Var_Samp_Fields = {
  __typename?: 'token_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "token" */
export type Token_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Token_Variance_Fields = {
  __typename?: 'token_variance_fields';
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "token" */
export type Token_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  /** An array relationship */
  Tokens: Array<Token>;
  /** An aggregate relationship */
  Tokens_aggregate: Token_Aggregate;
  blocked: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  password: Scalars['String'];
  role_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
  username: Scalars['String'];
};


/** columns and relationships of "user" */
export type UserTokensArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  Tokens?: InputMaybe<Token_Bool_Exp>;
  Tokens_aggregate?: InputMaybe<Token_Aggregate_Bool_Exp>;
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  blocked?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  role_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export type User_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'user_pkey';

/** input type for incrementing numeric columns in table "user" */
export type User_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  role_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  Tokens?: InputMaybe<Token_Arr_Rel_Insert_Input>;
  blocked?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  Tokens_aggregate?: InputMaybe<Token_Aggregate_Order_By>;
  blocked?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  role_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user" */
export type User_Select_Column =
  /** column name */
  | 'blocked'
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'password'
  /** column name */
  | 'role_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'username';

/** input type for updating data in table "user" */
export type User_Set_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "user" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "user" */
export type User_Update_Column =
  /** column name */
  | 'blocked'
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'password'
  /** column name */
  | 'role_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'username';

export type User_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};
