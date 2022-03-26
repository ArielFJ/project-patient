import { useTheme } from '@mui/material/styles';
import { Fab, IconButton, SxProps, Theme, Tooltip } from '@mui/material';
import React from 'react';
import { IconAlien } from '@tabler/icons';

/* ============== DIALOG ============== */

type FloatingButtonProps = {
  title: string;
  onClick: () => void;
  childContent?: React.ReactNode;
	styles?: SxProps<Theme>;
};

const FloatingButton = ({ title, onClick, childContent, styles }: FloatingButtonProps): JSX.Element => {
  const theme = useTheme();

  return (
    <>
      <Tooltip title={title} placement='top' disableInteractive>
        <Fab
          component="div"
          onClick={onClick}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '1%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial,
						...styles
          }}
        >
          <IconButton color="inherit" size="large" disableRipple>
            {childContent ?? <IconAlien />}
          </IconButton>
        </Fab>
      </Tooltip>
    </>
  );
};

export default FloatingButton;
