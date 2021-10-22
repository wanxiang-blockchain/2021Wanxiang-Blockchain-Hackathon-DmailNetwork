import * as React from 'react';
import { FC, Fragment, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import {
    List,
    MenuItem,
    ListItemIcon,
    Typography,
    Collapse,
    Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useTranslate, ReduxState } from 'react-admin';
import clsx from 'clsx';
import up from '../assets/red/up.png';

const useStyles = makeStyles(theme => ({
    icon: {
        width: '20px',
        height: '10px',
        backgroundImage: `url(${up})`,
        backgroundSize: '100%',
        marginRight: '12px',
        transition: 'transform 0.3s ease-in-out 0s',
        transformOrigin: 'center center',
    },
    menuItemDown: {
        transform: 'rotate(180deg)',
    },
    sidebarIsOpen: {
        '& a': {
            paddingLeft: '47px',
            transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        },
    },
    sidebarIsClosed: {
        '& a': {
            transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        },
    },
}));

interface Props {
    dense: boolean;
    handleToggle: () => void;
    icon: ReactElement;
    isOpen: boolean;
    name: string;
    className: string;
}

const SubMenu: FC<Props> = ({
    handleToggle,
    isOpen,
    name,
    icon,
    children,
    dense,
    className,
}) => {
    const translate = useTranslate();
    const classes = useStyles();
    const sidebarIsOpen = useSelector<ReduxState, boolean>(
        state => state.admin.ui.sidebarOpen
    );

    const header = (
        <MenuItem dense={dense} button onClick={handleToggle} className={className}>
            <ListItemIcon className={clsx(classes.icon, isOpen ? classes.menuItemDown : '')} />
            <Typography variant="inherit" color="inherit">
                {translate(name)}
            </Typography>
        </MenuItem>
    );

    return (
        <Fragment>
            {sidebarIsOpen || isOpen ? (
                header
            ) : (
                <Tooltip title={translate(name)} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List
                    dense={dense}
                    component="div"
                    disablePadding
                    className={
                        sidebarIsOpen
                            ? classes.sidebarIsOpen
                            : classes.sidebarIsClosed
                    }
                >
                    {children}
                </List>
            </Collapse>
        </Fragment>
    );
};

export default SubMenu;
