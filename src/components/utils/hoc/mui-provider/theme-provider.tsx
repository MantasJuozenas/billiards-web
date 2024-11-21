import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: { main: '#556cd6' },
    secondary: { main: '#19857b' },
    error: { main: red.A400 }
  }
});

export const MuiThemeProvider = (props: NMuiThemeProvider.IProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props?.children}
    </ThemeProvider>
  );
};

export namespace NMuiThemeProvider {
  export interface IProps {
    children: React.ReactNode;
  }
}
