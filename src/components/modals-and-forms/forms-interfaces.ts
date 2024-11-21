export interface FLogin {
  username: string;
  password: string;
  rememberMe: boolean;
}
export interface FRemindPassword {
  email: string;
}
export interface FChangePassword {
  username: string;
  password: string;
  passwordNew: string;
  passwordRepeatNew: string;
}
export interface FAddOrEditUser {
  username: string;
  password: string;
  passwordNew: string;
  passwordRepeatNew: string;
}

export interface FAddOrEditReservation {
  id?: number;
  date_time?: Date;
  date_number?: number;
  day_time?: string;
  duration?: string;
  name?: string;
  phone: string;
  comment?: string;
  location?: string;
  pool?: boolean;
  dart?: boolean;
  eat?: boolean;
  is_tournament?: boolean;
  company_name?: string;
  number_of_people?: number;
  type?: GQLEnums.EReservationType;
}

// eslint-disable-next-line no-shadow
export enum ELocation {
  'Kaunas',
  'Vilnius'
}

export interface FAddOrEditBlockedTime {
  all_day: boolean;
  time_from: number | null;
  time_to: number | null;
  pool: boolean;
  dart: boolean;
  location: ELocation | null;
}
