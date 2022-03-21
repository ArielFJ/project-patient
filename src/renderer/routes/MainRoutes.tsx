import React, { lazy } from 'react';

// project imports
import MainLayout from 'renderer/layout/MainLayout';
import Loadable from 'renderer/ui-component/Loadable';

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('renderer/views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('renderer/views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('renderer/views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('renderer/views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('renderer/views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('renderer/views/sample-page')));
const PatientsPage = Loadable(lazy(() => import('renderer/views/Patient/patients')));
const PatientInfoPage = Loadable(lazy(() => import('renderer/views/Patient/patientInfo')));
const Insurance = Loadable(lazy(() => import('renderer/views/Insurance')));
// import SamplePage from 'views/sample-page'; 

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <PatientsPage />
        },
        {
            path: '/patients',
            element: <PatientsPage />
        },
        {
            path: '/patients/:id',
            element: <PatientInfoPage />
        },
        {
            path: '/insurance',
            element: <Insurance />
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
