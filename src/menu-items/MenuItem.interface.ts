import { TablerIconDefinition } from './../types';
import React from 'react';

export type MenuItem = {
    id: string;
    title: string;
    type: 'group' | 'item' | 'collapse';
    target?: string;
    caption?: string;
    breadcrumbs?: boolean;
    external?: boolean;
    disabled?: boolean;
    url?: string;
    icon?: TablerIconDefinition;
    chip?: MenuItemChip;
    children?: MenuItem[];
};

interface MenuItemChip {
    avatar?: React.ReactElement;
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    label?: React.ReactNode;
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined';
}
