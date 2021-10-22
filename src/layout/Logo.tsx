import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    TextField,
    FieldProps,
} from 'react-admin';
import src from '*.bmp';
import LOGO from '../assets/red/logo.png'
import { AppState } from '../types';
import clsx from 'clsx';

const useStyles = makeStyles({
    logo: {
        display: 'block',
        width: '126px',
        height: '48px',
        marginLeft: '10px',
        backgroundSize: 'cover',
    },
});

interface logoProps {
    classes?: any;
}
const Logo = (props: logoProps) => {
    // const theme = useTheme();
    // const theme = useSelector((state: AppState) => state.theme);
    const classes = useStyles();
    const CustomerLogoField: FC<FieldProps> = p => (
        <div className={clsx(classes.logo, props.classes || '', 'logo')}></div>
    );
    return (
        <CustomerLogoField />
    );
};

export default Logo;
