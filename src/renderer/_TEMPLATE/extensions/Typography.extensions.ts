import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system';

declare module '@mui/material/styles/createTypography' {
    // eslint-disable-next-line
    interface Typography {
        customInput: CustomInput;
        mainContent: MainContent;
        menuCaption: MenuCaption;
        subMenuCaption: MenuCaption;
        commonAvatar: {
            cursor: string;
            borderRadius: string;
        };
        smallAvatar: CommonCssStyles;
        mediumAvatar: SizedAvatar;
        largeAvatar: SizedAvatar;
    }

    // eslint-disable-next-line
    interface TypographyOptions {
        customInput: CustomInput;
        mainContent: MainContent;
        menuCaption: MenuCaption;
        subMenuCaption: MenuCaption;
        commonAvatar: {
            cursor: string;
            borderRadius: string;
        };
        smallAvatar: CommonCssStyles;
        mediumAvatar: SizedAvatar;
        largeAvatar: SizedAvatar;
    }
}

type MainContent = {
    backgroundColor?: string;
    width: string;
    minHeight: string;
    flexGrow: number;
    padding: string;
    marginTop: string;
    marginRight: string;
    borderRadius: string;
};

type SizedAvatar = {
    width: string;
    height: string;
    fontSize: string;
};

type MenuCaption = SxProps<Theme> | undefined;

export type CustomInput = {
    marginTop: number;
    marginBottom: number;
    '& > label': {
        top: number;
        left: number;
        color: string;
        '&[data-shrink="false"]': {
            top: number;
        };
    };
    '& > div > input': {
        padding: string;
    };
    '& legend': {
        display: string;
    };
    '& fieldset': {
        top: number;
    };
};

export type CommonCssStyles = {
    fontWeight?: number;
    fontSize?: string;
    color?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: string;
    backgroundColor?: string;
    width?: string;
    height?: string;
    minHeight?: string;
    flexGrow?: number;
    padding?: string;
    marginTop?: string;
    marginRight?: string;
    cursor?: string;
    borderRadius?: string;
};
