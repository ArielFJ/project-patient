import React, { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'renderer/store/actions';
import config from 'renderer/config';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CustomizationRootState from 'renderer/store/CustomizationRootState';
import { MenuItem } from 'renderer/menu-items/MenuItem.interface';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

type NavItemProps = {
    item: MenuItem;
    level: number;
};

type ListItemProps = {
    component: React.ForwardRefExoticComponent<React.RefAttributes<HTMLAnchorElement>> | string;
    href?: string;
    target?: string;
}

const NavItem = ({ item, level }: NavItemProps): JSX.Element => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state: CustomizationRootState) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    // eslint-disable-next-line
    const Icon = item.icon!;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    const linkComponent = forwardRef<HTMLAnchorElement>((props, ref) => <Link ref={ref} {...props} to={`${config.basename}${item.url}`} target={itemTarget} />); 
    linkComponent.displayName = 'listItemProps';

    let listItemProps: ListItemProps = {
        component: linkComponent
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id: string) => {
        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.displayName = 'NavItem';
export default NavItem;