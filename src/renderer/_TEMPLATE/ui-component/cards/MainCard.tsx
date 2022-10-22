import React, { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { Secondary } from 'renderer/types';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

type MainCardProps = {
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: Record<string, unknown>;
  darkTitle?: boolean;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: Record<string, unknown>;
  title?: React.ReactNode;
  elevation?: number;
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      elevation,
      ...others
    }: MainCardProps,
    ref
  ) => {
    const theme = useTheme();

    // const generateCardHeader = (): JSX.Element => {
    //   return (
    //     <>
    //       {titleAction && titleAction}
    //       <Typography variant="h3">{title}</Typography>
    //     </>
    //   );
    // };

    return (
      <Card
        ref={ref}
        elevation={elevation}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 75,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.displayName = 'MainCard';
export default MainCard;
