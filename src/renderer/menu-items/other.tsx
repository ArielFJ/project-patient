// assets
import { IconBrandChrome, IconHelp, IconUsers } from '@tabler/icons';
import { MenuItem } from './MenuItem.interface';

// constant
const icons = { IconBrandChrome, IconHelp, IconUsers };

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
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
    ]
};

export default pages;
