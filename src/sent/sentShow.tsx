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
import { Sent, Customer } from '../types';

interface SentTitleProps {
    record?: Sent;
}

const useStyles = makeStyles(theme => ({
    root: {

    },
}));

const SentShow: FC<ShowProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Show {...props} />
        </div>
    );
};

export default SentShow;
