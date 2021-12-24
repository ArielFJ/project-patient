import { TypeText } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    dark: string;
    hint: string;
  }
}