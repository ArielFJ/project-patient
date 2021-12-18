import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import CustomizationRootState from 'store/CustomizationRootState';

// ==============================|| APP ||============================== //

const App = (): JSX.Element => {
    const customization = useSelector((state: CustomizationRootState) => state.customization);

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
