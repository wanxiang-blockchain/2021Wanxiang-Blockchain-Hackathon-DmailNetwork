import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    useRedirect,
} from 'react-admin';

import SubMenu from './SubMenu';

import CreateIcon from '@material-ui/icons/Create';

import { AppState } from '../types';
import Logo from './Logo';
import { sidebarWidth } from './utils';

interface MenuItemProp {
    name: string;
    leftIcon: any;
    to: string;
    smart_count?: number;
    exact?: boolean;
    children?: MenuItemProp[];
}

const Menus: MenuItemProp[] = [
    {
        name: 'pos.menu.compose',
        to: '/mails/create',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-compose" />,
    },
    {
        name: 'pos.menu.inbox',
        to: '/mails',
        smart_count: 0,
        exact: true,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-inbox" />,
    },
    {
        name: 'pos.menu.junk',
        to: '/junks',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-junk" />,
    },
    {
        name: 'pos.menu.sent',
        to: '/sents',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-sent" />,
    },
    {
        name: 'pos.menu.subscription',
        to: '/projects',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-subscription" />,
    },
    {
        name: 'pos.menu.assets',
        to: '/assets',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-assets" />,
    },
    {
        name: 'pos.menu.nfts',
        to: '/nfts',
        smart_count: 0,
        leftIcon: <ListItemIcon className="menu-item-icon menu-item-nfts" />,
    },
    {
        name: 'pos.menu.more',
        leftIcon: <CreateIcon />,
        to: '',
        children: [
            {
                name: 'pos.menu.trash',
                to: '/trashs',
                smart_count: 2,
                leftIcon: <ListItemIcon className="menu-item-icon menu-item-trash" />,
            },
            {
                name: 'pos.menu.settings',
                to: '/settings/show',
                smart_count: 2,
                leftIcon: <ListItemIcon className="menu-item-icon menu-item-settings" />,
            },
        ]
    },
]


const useStyles = makeStyles(theme => ({
    root: {
        width: `${sidebarWidth}px`,
        padding: '35px 0 35px 32px',
        boxSizing: 'border-box',
        borderRadius: '0px 26px 26px 0px',
        position: 'fixed',
        overflowY: 'auto',
        left: 0,
        top: 0,
        bottom: 0,
    },
    menus: {
        marginTop: '25px',
    },
}));

const useMenuListStyles = makeStyles(theme => ({
    root: {

    },
}));

interface MenuListProps {
    menus: MenuItemProp[];
    dense: boolean;
    parentName?: string;
}
const MenuList = ({ menus, dense, parentName = '' }: MenuListProps) => {
    const translate = useTranslate()
    const classes = useMenuListStyles();

    const [opened, setOpened] = useState<string[]>(['pos.menu.more'])
    const onToggleOpen = (name: string) => {
        if (opened.includes(name)) {
            setOpened([...opened].filter((_name: string) => name !== _name))
        } else {
            setOpened([...opened, name])
        }
    }

    return (
        <>
            {menus.map(({ name, to, exact, smart_count, leftIcon, children }: MenuItemProp) => (
                children ?
                    <SubMenu
                        handleToggle={() => onToggleOpen(name)}
                        isOpen={opened.includes(name)}
                        name={name}
                        icon={leftIcon}
                        dense={dense}
                        className={clsx(classes.root, 'sidebarMenuItem')}
                        key={`${parentName}${name}`}
                    >
                        <MenuList menus={children} dense={dense} parentName={`${parentName}${name}-`} />
                    </SubMenu>
                    :
                    <MenuItemLink
                        to={to}
                        exact={exact}
                        primaryText={translate(name, {
                            smart_count,
                        })}
                        leftIcon={leftIcon}
                        dense={dense}
                        className={clsx(classes.root, 'sidebarMenuItem')}
                        key={`${parentName}${name}`}
                    />
            ))
            }
        </>
    )
}

const MenuWrapper = ({ dense = false }: MenuProps) => {
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const classes = useStyles();
    // const theme = useSelector((state: AppState) => state.theme);

    // const redirect = useRedirect();
    // const onCreate = () => {
    //     redirect('create', '../');
    // };

    return (
        <div className={clsx(classes.root, 'menu-bg')}>
            <Logo />
            <div className={classes.menus}>
                <MenuList menus={Menus} dense={dense} />
            </div>
        </div >
    );
};

export default MenuWrapper;
