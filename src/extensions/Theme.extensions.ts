import { CustomizationState } from 'store/CustomizationRootState';

declare module '@mui/material/styles' {
  interface Theme {
    grey500: string;
    colors: Record<string, string>;
    heading: string;
    paper: string;
    backgroundDefault: string;
    background: string;
    darkTextPrimary: string;
    darkTextSecondary: string;
    textDark: string;
    menuSelected: string;
    menuSelectedBack: string;
    divider: string;
    customization: CustomizationState;
    fontFamily: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    grey500?: string;
    colors?: Record<string, string>;
    heading?: string;
    paper?: string;
    backgroundDefault?: string;
    background?: string;
    darkTextPrimary?: string;
    darkTextSecondary?: string;
    textDark?: string;
    menuSelected?: string;
    menuSelectedBack?: string;
    divider?: string;
    customization?: CustomizationState;
    fontFamily?: string;
  }
}