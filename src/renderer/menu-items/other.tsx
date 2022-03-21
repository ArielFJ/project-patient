// assets
import { IconBrandChrome, IconReportMedical, IconUsers } from '@tabler/icons';
import { MenuItem } from './MenuItem.interface';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const pages: MenuItem = {
    id: 'sample-docs-roadmap',
    title: 'Main',
    type: 'group',
    children: [
        {
            id: 'patients',
            title: 'Patients',
            type: 'item',
            url: '/patients',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'insurance',
            title: 'Health Insurance',
            type: 'item',
            url: '/insurance',
            icon: IconReportMedical,
            breadcrumbs: false
        },
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: IconBrandChrome,
            breadcrumbs: false
        },
    ]
};

export default pages;
