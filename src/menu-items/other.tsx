// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import { MenuItem } from './MenuItem.interface';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: MenuItem = {
    id: 'sample-docs-roadmap',
    title: 'Main',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default other;
