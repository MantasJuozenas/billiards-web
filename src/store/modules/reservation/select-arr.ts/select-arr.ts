import { useTranslation } from 'next-i18next';

export const ReservationTimeSelectArr = () => {
  const { t } = useTranslation();

  const timeOptions: G.TSelect[] = [
    {
      value: '60',
      label: t('modals-and-forms:::FormAddOrEditReservation::1 h.')
    },
    {
      value: '90',
      label: t('modals-and-forms:::FormAddOrEditReservation::1 h. 30 min.')
    },
    {
      value: '120',
      label: t('modals-and-forms:::FormAddOrEditReservation::2 h.')
    },
    {
      value: '150',
      label: t('modals-and-forms:::FormAddOrEditReservation::2 h. 30 min.')
    },
    {
      value: '180',
      label: t('modals-and-forms:::FormAddOrEditReservation::3 h.')
    },
    {
      value: '210',
      label: t('modals-and-forms:::FormAddOrEditReservation::3 h. 30 min.')
    },
    {
      value: '240',
      label: t('modals-and-forms:::FormAddOrEditReservation::4 h.')
    },
    {
      value: '270',
      label: t('modals-and-forms:::FormAddOrEditReservation::4 h. 30 min.')
    },
    {
      value: '300',
      label: t('modals-and-forms:::FormAddOrEditReservation::5 h.')
    }
  ];

  return { timeOptions };
};
