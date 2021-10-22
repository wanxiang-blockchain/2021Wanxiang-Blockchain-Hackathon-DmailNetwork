import * as React from 'react';
import { useSelector } from 'react-redux';
import { Layout, LayoutProps, Sidebar } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import { darkTheme, lightTheme } from './themes';
import { redTheme } from './redTheme';
import { AppState } from '../types';
import { ControlPointSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { sidebarWidth } from './utils';

const useSidebarStyles = makeStyles({
    // This paper is stupid! We do no need it!
    drawerPaper: {
        width: sidebarWidth,
    },
});

// Why must have sidebar, the menu is enough !!!!
const CustomSidebar = (props: any) => {
    const classes = useSidebarStyles();
    return (
        <Sidebar classes={classes} {...props} />
    )
};

export default (props: LayoutProps) => {
    const theme = useSelector((state: AppState) =>
        state.theme === 'red' ? redTheme : (state.theme === 'dark' ? darkTheme : lightTheme)
    );
    return (
        <Layout
            {...props}
            appBar={AppBar}
            sidebar={CustomSidebar}
            menu={Menu}
            theme={theme}
        />
    );
};
