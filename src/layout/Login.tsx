import * as React from 'react';
import { useState, useCallback, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { changeEmail } from '../configuration/actions';
import Logo from './Logo';
import { Storage, Email_Name, Username, Identity_Key } from '../utils/storage'
import { fetch, emailHost } from '../utils'

import {
    Container,
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import { Notification, useTranslate, useLogin, useNotify, useRedirect } from 'react-admin';

import { redTheme } from './redTheme';
import { authClient } from '../service';
import { Identity } from "@dfinity/agent";


const useStyles = makeStyles(theme => ({
    logo: {
        width: '178px',
        height: '68px',
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '13%',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    },
    card: {
        width: '484px',
        height: '280px',
        padding: '66px 52px',
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '28.7%',
        backgroundColor: '#fff',
        borderRadius: '2px',
        boxSizing: 'border-box',
        textAlign: 'center',

        '& .login-btn': {
            height: '52px',
            marginTop: '46px',
            borderRadius: '5px',
            transition: 'transform .3s ease',

            '&:hover': {
                transform: 'scale(1.05)',
            }
        },

        '& .login-text': {
            fontSize: '30px',
            color: '#4B3A3A',
            fontWeight: 500,
        },

        "@media screen and (max-height: 800px)": {
            top: '38%',
        },

        "@media screen and (max-width: 1600px)": {
            width: '400px',
            height: '210px',
            padding: '42px 48px 48px',

            '& .login-btn': {
                height: '42px',
                marginTop: '42px',
            },

            '& .login-text': {
                fontSize: '24px',
            },
        },
    },
    description: {
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '22.6%',
        backgroundSize: '100%',

        "@media screen and (max-height: 800px)": {
            top: '28%',
        }
    },
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

interface FormValues {
    username?: string;
    password?: string;
}

const { Form } = withTypes<FormValues>();

type AuthorizeProps = {
    setIsAuthenticated: (x: boolean) => void;
};


const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const dispatch = useDispatch();
    // const login = useLogin();
    const location = useLocation<{ nextPathname: string } | null>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);
    };

    const redirect = useRedirect();

    const getEmail = (identity: string) => {
        fetch('users', 'getOne', identity).then((res) => {
            const { data, success } = res
            if (success && data) {
                dispatch(changeEmail(data))
                Storage.set(Email_Name, data);
                Storage.set(Username, data.replace(emailHost, ''));
            }
        }).catch((error) => {
            console.log('error', error);
        })
    }

    const handleConnect = async () => {
        //setLoading(true);
        await authClient.create();
        await authClient.login();
        const identity = await authClient.getIdentity();
        if (identity) {
            const sIdentity = identity.getPrincipal().toString()
            getEmail(sIdentity);
            setIsAuthenticated(true);
            // @TODO: need to put the identity in to the cookie soon
            Storage.set(Identity_Key, sIdentity);
            //setLoading(false)
            redirect('./mails');
        } else {
            console.error("could not get identity");
        }
    }

    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    return (
        <Container maxWidth={false} className="login-wrapper">
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} >
                        <div className={clsx(classes.logo, "login-logo")} />
                        <div className={clsx(classes.description, "login-description")} />
                        <Card className={clsx(classes.card, "login-card")}>
                            <span className="login-text">WELCOME!</span>
                            <Button
                                onClick={() => { handleConnect() }}
                                color="primary"
                                disabled={loading}
                                className="login-btn"
                                fullWidth
                            >
                                {loading && (
                                    <CircularProgress
                                        size={25}
                                        thickness={2}
                                    />
                                )}
                                {translate('pos.login')}
                            </Button>
                        </Card>
                        <Notification />
                    </form>
                )}
            />
        </Container>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme

const LoginWithTheme = (props: any) => (
    < ThemeProvider theme={createTheme(redTheme)} >
        <Login {...props} />
    </ThemeProvider >
);

export default LoginWithTheme;
