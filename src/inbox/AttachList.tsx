import * as React from 'react';
import { FC } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, FieldProps, useTranslate, DatagridProps,linkToRecord } from 'react-admin';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';


import { AppState, Mail, Product } from '../types';

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    attach_title: {
        bold: true,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
}));

const getColsForWidth = (width) => {
    let mywidth: Breakpoint = width as Breakpoint;
    if (mywidth === 'xs') return 2;
    if (mywidth === 'sm') return 3;
    if (mywidth === 'md') return 3;
    if (mywidth === 'lg') return 5;
    return 6;
};

interface AttachProps {
    record?: Mail;
}

const AttachList:FC<AttachProps> = ({ record }) => {
    const classes = useStyles();
    const translate = useTranslate();

    return record ?(
        <MuiGridList
            cellHeight={180}
            cols={6}
            className={classes.gridList}
        >
            {record.attachs.map((item: any) => (
                <GridListTile
                    // @ts-ignore
                    
                >
                    <a target="_blank" rel="noopener noreferrer" href={item.url}>
                     <img src={item.thumbnail} alt="" />
                    </a>
                    <GridListTileBar
                        className={classes.tileBar}
                        title={item.name}
                        subtitle={
                            <span>
                                ${item.price}
                            </span>
                        }
                    />
                </GridListTile>
            ))}
        </MuiGridList>
    ): null;
};


export default AttachList;
