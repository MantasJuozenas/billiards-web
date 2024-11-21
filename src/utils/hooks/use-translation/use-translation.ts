// import { GetLocaleStorageLocale } from '@store/modules/local-storage/functions/locale';
// import * as TT from '@store/modules/translations/types';

// import { useSelector } from '../use-selector';
// import { parsableFields } from './use-translation.parser';

// interface ITranslationFn {
//   (key: string[], defaultLocaleFromStore?: G.TDefaultLocales): string;
//   (
//     key: string[],
//     defaultLocaleFromStore?: G.TDefaultLocales,
//     ...parts: any[]
//   ): string;
// }

// export function useTranslation() {
//   /* eslint-disable prettier/prettier */
//   const { defaultLocale, locales, languageNames } = useSelector(s => s.translations);

//   // eslint-disable-next-line sonarjs/cognitive-complexity
//   function t(key: string[], defaultLocaleFromStore?: G.TDefaultLocales, ...parts: any[]) {
//     let localeNameIndex = locales.indexOf(defaultLocale);

//     if (defaultLocaleFromStore) {
//       const userLocale = defaultLocaleFromStore;
//       if (defaultLocale !== userLocale) {
//         if (locales?.includes(userLocale)) {
//           localeNameIndex = locales.indexOf(userLocale);
//         } else {
//           console.error(`Error in translations: => Your given locale '${defaultLocaleFromStore}' is not in locales array!
//           \n\nReturning back to default '${locales[localeNameIndex]}'...\n`)
//         }
//       }
//     }

//     if (!defaultLocaleFromStore) {
//       const userLocale = GetLocaleStorageLocale();
//       if (defaultLocale !== userLocale && locales?.includes(userLocale)) {
//           localeNameIndex = locales.indexOf(userLocale);
//         }
//     }

//     if (typeof key[0] !== 'string') {
//       console.error(
//         `Error in translations: => Translation is not an array of strings!\n\nI can't translate:\n\n\t> ${JSON.stringify(key)}\n`);
//       return '';
//     }
//     if (key?.length !== locales?.length) {
//       console.error(
//         `Error in translations: => Translation length ${key?.length} !== 'locales' length ${locales?.length}!
//         \n\n> Translation array length should be ${locales?.length} but now is ${key?.length}:\n\n\t${JSON.stringify(key)}\n`);

//       const foundTranslation = key[localeNameIndex];
//       return parsableFields(foundTranslation, ...parts);
//     }
//     if (typeof key[0] === 'string' && key?.length === locales?.length) {
//       const foundTranslation = key[localeNameIndex];
//       if (!foundTranslation) {
//         console.error(
//           `Error in translations: => In language '${locales[localeNameIndex]}' translation!
//           \n\nEmpty string in array is not tolirated:\n\n\t${JSON.stringify(key)}\n`);
//         return '';
//       }
//       return parsableFields(foundTranslation, ...parts);
//     }
//     console.error(
//       `Error in translations: => Unknown error... check everything starting from store! \n\n\t${JSON.stringify(key)}\n`
//     );
//     return '';
//   }

//   return { t: t as ITranslationFn, defaultLocale, locales, languageNames };
//   /* eslint-enable prettier/prettier */
// }

// /* eslint-disable prettier/prettier */
// // eslint-disable-next-line sonarjs/cognitive-complexity
// export const tFn = (key: string[], defaultLocaleFromStore?: G.TDefaultLocales, ...parts: any[]) => {
//   let localeNameIndex = TT.locales.indexOf(TT.defaultLocale);

//   if (defaultLocaleFromStore) {
//     const userLocale = defaultLocaleFromStore;
//     if (TT.defaultLocale !== userLocale) {
//       if (TT.locales?.includes(userLocale)) {
//         localeNameIndex = TT.locales.indexOf(userLocale);
//       } else {
//         console.error(`Error in translations: => Your given locale '${defaultLocaleFromStore}' is not in locales array!
//         \n\nReturning back to default '${TT.locales[localeNameIndex]}'...\n`)
//       }
//     }
//   }

//   if (!defaultLocaleFromStore) {
//     const userLocale = GetLocaleStorageLocale();
//     if (TT.defaultLocale !== userLocale && TT.locales?.includes(userLocale)) {
//         localeNameIndex = TT.locales.indexOf(userLocale);
//       }
//   }

//   if (typeof key[0] !== 'string') {
//     console.error(
//       `Error in translations: => Translation is not an array of strings!\n\nI can't translate:\n\n\t> ${JSON.stringify(key)}\n`);
//     return '';
//   }
//   if (key?.length !== TT.locales?.length) {
//     console.error(
//       `Error in translations: => Translation length ${key?.length} !== 'locales' length ${TT.locales?.length}!
//       \n\n> Translation array length should be ${TT.locales?.length} but now is ${key?.length}:\n\n\t${JSON.stringify(key)}\n`);

//     const foundTranslation = key[localeNameIndex];
//     return parsableFields(foundTranslation, ...parts);
//   }
//   if (typeof key[0] === 'string' && key?.length === TT.locales?.length) {
//     const foundTranslation = key[localeNameIndex];
//     if (!foundTranslation) {
//       console.error(
//         `Error in translations: => In language '${TT.locales[localeNameIndex]}' translation!
//         \n\nEmpty string in array is not tolirated:\n\n\t${JSON.stringify(key)}\n`);
//       return '';
//     }
//     return parsableFields(foundTranslation, ...parts);
//   }
//   console.error(
//     `Error in translations: => Unknown error... check everything starting from store! \n\n\t${JSON.stringify(key)}\n`
//   );
//   /* eslint-enable prettier/prettier */
//   return '';
// };

// type TMappedParts<T> = T extends string[]
//   ? any[]
//   : T extends object
//   ? { [K in keyof T]?: TMappedParts<T[K]> }
//   : never;
// type TMappedStrings<T> = T extends string[]
//   ? string
//   : T extends object
//   ? { [K in keyof T]: TMappedStrings<T[K]> }
//   : never;
// function doTranslate(
//   strs: any,
//   translator: (record: string[], parts: any[]) => string,
//   partsObject?: any
// ) {
//   if (Array.isArray(strs)) return translator(strs, partsObject);
//   if (typeof strs === 'object') {
//     const returnValue = {};
//     // eslint-disable-next-line no-restricted-syntax
//     for (const key of Object.keys(strs)) {
//       const parts = (partsObject || {})[key];
//       // @ts-ignore
//       returnValue[key] = doTranslate(strs[key], translator, parts);
//     }
//     return returnValue;
//   }
//   return null;
// }
// export const useTranslate = <T extends object>(
//   strings: T,
//   extra?: {
//     locale?: TT.TDefaultLocales;
//     parts?: TMappedParts<T>;
//   }
// ): TMappedStrings<T> => {
//   const { t } = useTranslation();
//   return doTranslate(
//     strings,
//     (record, parts) =>
//       parts ? t(record, extra?.locale, parts) : t(record, extra?.locale),
//     extra?.parts
//   ) as any;
// };
export {};
