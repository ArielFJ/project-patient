import React, { lazy } from 'react';

// project imports
import MainLayout from 'renderer/layout/MainLayout';
import Loadable from 'renderer/ui-component/Loadable';
import PatientInfoPage from 'renderer/views/Patient/patientInfo';
import PatientsPage from 'renderer/views/Patient/patients';

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
        // {
        //     path: '/consultations/new',
        //     element: <AddConsultationPage />
        // },
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
