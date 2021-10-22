
import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';
import { useRefresh, useRedirect } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import down from '../assets/red/down3.png';

const useStyles = makeStyles(
    theme => ({
        root: {
            position: 'relative',
            width: '200px',
            border: '1px solid #ddd',
            padding: '0 15px',
            lineHeight: '30px',
            marginRight: '30px',
            cursor: 'pointer',
            color: 'rgba(0, 0, 0, 0.87)',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            '&::after': {
                content: '""',
                width: '20px',
                height: '11px',
                display: 'block',
                background: `url(${down}) no-repeat`,
                backgroundSize: '100%',
                transition: 'transform 0.3s ease-in-out 0s',
                transformOrigin: 'center center',
            },

            '&.show': {
                '&::after': {
                    transform: 'rotate(180deg)',
                },
                '& ul': {
                    display: 'block',
                },
            },

            '& ul': {
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '2px',
                boxShadow: '0px 5px 5px -3px rgb(0, 0, 0, 0.2), 0px 8px 10px 1px rgb(0, 0, 0,  0.14), 0px 3px 14px 2px rgb(0, 0, 0,  0.12)',
                padding: '8px 0',
                borderRadius: '4px',
                background: '#fff',
                display: 'none',

                '& li': {
                    display: 'block',
                    overflow: 'hidden',
                    fontSize: '16px',
                    lineHeight: 1.5,
                    padding: '6px 20px',
                    color: 'rgba(0, 0, 0, 0.54)',
                    cursor: 'pointer',
                    userSelect: 'none',

                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        color: '#FA6755',
                    }
                }
            },
        },
    }));

interface Option {
    label: string;
    value: string;
}
interface Props {
    options: Option[];
}
const DropDown: FC<Props> = ({ options }) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const onMoveAsset = () => {
        redirect('create', './assets');
    };

    const [asset, setAsset] = useState<string>('');
    const [assetText, setAssetText] = useState<string>('');
    const [showDrop, setShowDrop] = useState<boolean>(false);
    const refresh = useRefresh();
    const onSelectDrop = (value: string) => () => {
        setAsset(value);
        // @TODO: can not use refresh，it let the whole component reRender!!!!
        // refresh();
    }
    useEffect(() => {
        const filter = options.filter(({ value }: { value: string }) => value === asset)
        setAssetText(filter.length ? filter[0].label : '')
    }, [asset])

    const dropClick = useCallback((ev) => {
        if (ev.target.closest('.__drops') && !ev.target.closest('.__drops ul')) {
            setShowDrop(!showDrop)
        } else {
            setShowDrop(false)
        }
    }, [showDrop, setShowDrop]);
    useEffect(() => {
        document.body.addEventListener('click', dropClick)

        return () => {
            document.body.removeEventListener('click', dropClick)
        }
    }, [dropClick])

    return (
        <div className={clsx(classes.root, '__drops', showDrop ? 'show' : '')}>
            <span>{assetText || 'Please select'}</span>
            <ul>
                {options.map(({ label, value }: { label: string, value: string }) => (
                    <li key={value} onClick={onSelectDrop(value)}>{label}</li>
                ))}
            </ul>
        </div>
    )
};

export default DropDown;