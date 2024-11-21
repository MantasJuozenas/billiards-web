/* eslint-disable eqeqeq */
/* eslint-disable sonarjs/no-all-duplicated-branches */
export const relativeTimeLocaleObjectLT = {
  future: 'už %s',
  past: 'prieš %s',
  s(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
  },
  m(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    return isFuture ? 'minutės' : 'minutę';
  },

  mm(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    const i18n_past =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} minučių`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} minutę`
        : `${number} minutes`;
    const i18n_future =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} minučių`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} minutės`
        : `${number} minučių`;
    return isFuture ? i18n_future : i18n_past;
  },
  h(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    return isFuture ? 'valandos' : 'valandą';
  },
  hh(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    const i18n_past =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} valandų`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} valandą`
        : `${number} valandas`;
    const i18n_future =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} valandų`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} valandos`
        : `${number} valandų`;
    return isFuture ? i18n_future : i18n_past;
  },
  d(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    return isFuture ? 'dienos' : 'dieną';
  },
  dd(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    const i18n_past =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} dienų`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} dieną`
        : `${number} dienas`;
    const i18n_future =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} dienų`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} dienos`
        : `${number} dienų`;
    return isFuture ? i18n_future : i18n_past;
  },
  M(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    return isFuture ? 'mėnesio' : 'mėnesį';
  },
  MM(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    const i18n_past =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} mėnesių`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} mėnesį`
        : `${number} mėnesius`;
    const i18n_future =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} mėnesių`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} mėnesio`
        : `${number} mėnesių`;
    return isFuture ? i18n_future : i18n_past;
  },
  y(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    return isFuture ? 'metų' : 'metus';
  },
  yy(
    number: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string {
    const i18n_past =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} metų`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} metus`
        : `${number} metus`;
    const i18n_future =
      number == 0 || number % 10 == 0 || (number > 10 && number <= 20)
        ? `${number} metų`
        : number % 10 === 1 && !(number > 10 && number <= 20)
        ? `${number} metų`
        : `${number} metų`;
    return isFuture ? i18n_future : i18n_past;
  }
};
