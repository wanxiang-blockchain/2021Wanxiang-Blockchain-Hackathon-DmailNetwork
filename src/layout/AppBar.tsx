import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, UserMenu, MenuItemLink, useTranslate } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { sidebarWidth } from './utils';
import back from '../assets/red/back.png';

const useStyles = makeStyles({
    root: {
        minHeight: '42px',
        padding: '24px 27px',
        marginBottom: '30px',
        marginLeft: `${sidebarWidth}px`,
        background: '#fff',
        borderRadius: '24px',

        "@media screen and (max-width: 1440px)": {
            marginBottom: '20px',
        },

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: '30px',
        color: '#083353',
        display: 'flex',
        alignItems: 'center',

        '& span': {
            display: 'flex',
            alignItems: 'center',
        },

        '& i': {
            marginRight: '15px',
            width: '21px',
            height: '37px',
            background: `url(${back}) no-repeat`,
            backgroundSize: '100%',
            cursor: 'pointer',
        },
    },

    user: {

    },
    search: {
        width: '352px',
        height: '42px',
        lineHeight: '30px',
        padding: '0 26px 0 32px',
        marginRight: '32px',
        backgroundColor: '#F7F6F4',
        borderRadius: '31px',
        boxSizing: 'border-box',

        display: 'flex',
        alignItems: 'center',

        '& input': {
            fontSize: '16px',
            border: 'none',
            background: 'none',
            lineHeight: '20px',
            flex: 1,
            outline: 'none',

            '&::-webkit-input-placeholder': {
                color: '#B3B3B3',
            }
        },

        '& .searchSubmit': {
            width: '20px',
            height: '20px',
            marginLeft: '20px',
            backgroundSize: '100%',
        }
    },
    spacer: {
        flex: 1,
    },
});

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
            onClick={props.onClick}
            sidebarIsOpen
        />
    );
});

const CustomUserMenu = (props: any) => (
    <UserMenu {...props} className={props.classes.user}>
        <ConfigurationMenu />
    </UserMenu>
);

interface SearchProps {
    defaultValue: string;
    pathname: string;
    classes: any;
}
const Search = ({ defaultValue, pathname, classes, ...props }: SearchProps) => {
    const [value, setValue] = React.useState<string>(defaultValue || '');
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const params = {
        displayedFilters: {},
        filter: {
            status: 'primary',
            q: value,
        },
        order: 'DESC',
        page: '1',
        perPage: '25',
        sort: 'date',
    }
    const sPrams = Object.keys(params).reduce((s: string, key: string) => {
        const value = typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]
        return `${s}&${key}=${encodeURIComponent(value)}`
    }, '')

    return (
        <div className={classes}>
            <input placeholder="Search here..." value={value} onChange={onChange} />
            <Button
                className="searchSubmit"
                component={Link}
                to={{
                    pathname,
                    search: sPrams,
                }}
            />
        </div >
    )
}

const CustomAppBar = (props: any) => {
    const classes = useStyles();
    const pathname = useSelector((state: AppState) => {
        const location = state?.router?.location;
        return location.pathname || ''
    });
    const searchQValue = useSelector((state: AppState) => {
        const location = state?.router?.location;
        const query: any = 'query' in location ? location['query'] : {};
        const filter: string = 'filter' in query ? query.filter : '';
        try {
            const oFilter = JSON.parse(decodeURIComponent(filter));

            let q = '';
            if (typeof oFilter === 'object' && 'q' in oFilter) {
                q = typeof oFilter.q === 'string' ? oFilter.q : '';
            }
            return q;
        } catch (error) {
            return ''
        }
    });

    const needSearch = ['/mails', '/junks', '/sents', '/projects', '/assets', '/trashs'].includes(pathname);
    const isFirstLevel = pathname.includes('/mails/create') || !/^\/[^\/]+\/[^\/]+/.test(pathname);
    const backToPrev = () => {
        window.history.back();
    }
    // console.log(pathname, pathname === '/nft/create')
    let title = isFirstLevel ? null : (<i onClick={backToPrev}></i>);
    if (pathname === '/nfts/create') {
        title = (<span><i onClick={backToPrev}></i>NFT Market</span>)
    }
    if (pathname.includes('/settings/show')) {
        title = <span>Settings</span>;
    }

    return (
        // <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
        <div className={classes.root}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            >{title}</Typography>
            <div className={classes.right}>
                {needSearch ? <Search classes={classes.search} defaultValue={searchQValue} pathname={pathname} /> : null}
                <CustomUserMenu classes={classes} />
            </div>
        </div>
    );
};

export default CustomAppBar;
