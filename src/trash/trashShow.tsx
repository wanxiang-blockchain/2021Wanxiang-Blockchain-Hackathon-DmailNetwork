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
import { Trash, Customer } from '../types';

interface TrashTitleProps {
    record?: Trash;
}

const useStyles = makeStyles(theme => ({
    root: {

    },
}));

const TrashShow: FC<ShowProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Show {...props} />
        </div>
    );
};

export default TrashShow;
