import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import Logo from 'renderer/_TEMPLATE/ui-component/Logo';
import CONFIG from 'renderer/config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection: React.FC = (): JSX.Element => (
    <ButtonBase disableRipple component={Link} to={CONFIG.defaultPath}>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
