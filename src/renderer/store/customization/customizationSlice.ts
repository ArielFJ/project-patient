import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// project imports
import config from 'renderer/config';

export type CustomizationState = {
  isOpen: string[];
  fontFamily: string;
  borderRadius: number | number[];
  opened: boolean;
  navType?: PaletteMode;
}

const initialState: CustomizationState = {
  isOpen: [], // for active default menu
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
};

export const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    menuOpen: (state, action: PayloadAction<string>) => {
      state.isOpen = [action.payload];
    },
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number | number[]>) => {
      state.borderRadius = action.payload;
    }
  }
});

export const { menuOpen, setMenu, setFontFamily, setBorderRadius } = customizationSlice.actions;

export default customizationSlice.reducer;
