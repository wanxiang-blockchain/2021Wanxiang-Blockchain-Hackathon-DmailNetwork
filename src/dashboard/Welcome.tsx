import * as React from 'react';
import { FC } from 'react';
import { Box, Card, CardActions, Button, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

import publishArticleImage from './welcome_illustration.svg';

const useStyles = makeStyles(theme => ({
    root: {
        background:
            theme.palette.type === 'dark'
                ? '#535353'
                : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

        color: '#fff',
        padding: 20,
        marginTop: theme.spacing(2),
        marginBottom: '1em',
    },
    media: {
        background: `url(${publishArticleImage}) top right / cover`,
        marginLeft: 'auto',
    },
    actions: {
        [theme.breakpoints.down('md')]: {
            padding: 0,
            flexWrap: 'wrap',
            '& a': {
                marginTop: '1em',
                marginLeft: '0!important',
                marginRight: '1em',
            },
        },
    },
}));

const Welcome: FC = () => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('pos.dashboard.welcome.title')}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default Welcome;
