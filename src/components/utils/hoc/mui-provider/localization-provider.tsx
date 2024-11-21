import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const MuiLocalizationProvider = (
  props: NMuiLocalizationProvider.IProps
) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {props?.children}
    </LocalizationProvider>
  );
};

export namespace NMuiLocalizationProvider {
  export interface IProps {
    children: React.ReactNode;
  }
}
