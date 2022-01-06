import React, { lazy } from 'react';

// project imports
import MainLayout from 'renderer/layout/MainLayout';
import Loadable from 'renderer/ui-component/Loadable';
import Patients from 'renderer/views/patients';

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('renderer/views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('renderer/views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('renderer/views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('renderer/views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('renderer/views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('renderer/views/sample-page')));
// import SamplePage from 'views/sample-page'; 

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Patients />
        },
        {
            path: '/patients',
            element: <Patients />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
