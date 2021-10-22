import * as React from 'react';
import { FC } from 'react';
import {
    ShowProps,
    useShowController,
    useRedirect,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Show from '../components/show'
import { Junk, Customer } from '../types';

const useStyles = makeStyles(theme => ({
    root: {

    },
}));

const JunkShow: FC<ShowProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Show {...props} />
        </div>
    );
};

export default JunkShow;
