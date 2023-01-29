// assets
import { IconBrandChrome, IconReportMedical, IconUsers } from '@tabler/icons';
import { trans } from 'renderer/utils/localization';
import { MenuItem } from './MenuItem.interface';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const pages: MenuItem = {
    id: 'sample-docs-roadmap',
    title: trans('Main'),
    type: 'group',
    children: [
        {
            id: 'patients',
            title: trans('Patients'),
            type: 'item',
            url: '/patients',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'insurance',
            title: trans('Health_Insurances'),
            type: 'item',
            url: '/insurance',
            icon: IconReportMedical,
            breadcrumbs: false
        },
        {
            id: 'sample-page',
            title: trans('Sample Page'),
            type: 'item',
            url: '/sample-page',
            icon: IconBrandChrome,
            breadcrumbs: false
        },
    ]
};

export default pages;
