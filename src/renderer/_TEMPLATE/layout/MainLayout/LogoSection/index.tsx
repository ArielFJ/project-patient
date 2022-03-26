import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'renderer/config';
import Logo from 'renderer/_TEMPLATE/ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection: React.FC = (): JSX.Element => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
