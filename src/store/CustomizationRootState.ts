import { PaletteMode } from "@mui/material";
import { DefaultRootState } from "react-redux";

export default interface CustomizationRootState extends DefaultRootState{
  customization: CustomizationState;
}

export interface CustomizationState {
  isOpen: string[];
  fontFamily: string;
  borderRadius: number | number[];
  opened: boolean;
  navType?: PaletteMode;
}