import { CITY, COMPANY_CONTACTS } from '@constants/app-constants';
import { ELocation } from '@typings/graphql/enum-schema';

export const GetRestaurantLocation = () => {
  const isKaunas = CITY === 'Kaunas' || !CITY;
  const isVilnius = CITY === 'Vilnius'
  return { isKaunas, isVilnius };
};

export const GetCompanyContacts = () => {
  const { isKaunas, isVilnius } = GetRestaurantLocation();

  const contacts = isKaunas
    ? COMPANY_CONTACTS['Savanorių pr. 363 Kaunas']
    : isVilnius
    ? COMPANY_CONTACTS['Verkių g. 29, 09108 Vilnius']
    : COMPANY_CONTACTS['Savanorių pr. 363 Kaunas'];

  return { contacts };
};
