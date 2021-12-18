import React from 'react';

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        lightWarning: Palette['primary'];
        orange: BasicColors;
        dark: DarkColors;
    }

    interface PaletteOptions {
        lightWarning?: PaletteOptions['primary'];
        orange: BasicColors;
        dark: DarkColors;
    }

    interface PaletteColor {
        200: string;
        800: string;
    }
}

type BasicColors = {
    light: string;
    main: string;
    dark: string;
}

type DarkColors = BasicColors & {
    800: string;
    900: string;
}