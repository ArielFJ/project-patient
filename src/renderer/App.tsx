import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'renderer/routes';

// defaultTheme
import themes from 'renderer/_TEMPLATE/themes';

// project imports
import NavigationScroll from 'renderer/_TEMPLATE/layout/NavigationScroll';
import { RootState } from './store';

// ==============================|| APP ||============================== //

const App = (): JSX.Element => {
    const customization = useSelector((state: RootState) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <React.StrictMode>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </React.StrictMode>
        </StyledEngineProvider>
    );
};

export default App;
