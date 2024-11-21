/* eslint-disable no-shadow */
export enum EBreakpoint {
  /* mobile */
  ExtraSmall = 'extra-small',
  /* Small tablet */
  Small = 'small',
  /* large tablet / small laptop */
  Medium = 'medium',
  /* Medium tablet */
  Tablet = 'tablet',
  /* laptop / desktop */
  Large = 'large',
  /* desktop */
  ExtraLarge = 'extra-large'
}

export enum ELoginResError {
  noError = '',
  'Vartotojas nerastas' = 'Vartotojas nerastas',
  'Vartotojas užblokuotas' = 'Vartotojas užblokuotas',
  'Vartotojo token false' = 'Vartotojo token false',
  'Blogas slaptažodis' = 'Blogas slaptažodis',
  'Įvyko klaida' = 'Įvyko klaida',
  'Netinkamas kortelės numeris' = 'Netinkamas kortelės numeris',
  'Netinkamas kodas' = 'Netinkamas kodas',
  'Kortelė užblokuota' = 'Kortelė užblokuota'
}

export enum ELoginSuccess {
  noSuccess = '',
  ok = 'OK'
}
