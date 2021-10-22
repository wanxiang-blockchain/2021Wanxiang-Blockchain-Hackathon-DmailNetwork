import React, { FC, useEffect, useState, useRef } from 'react';
import {
    CreateContextProvider,
    useRecordContext,
    ResourceContextProvider,
    useCheckMinimumRequiredProps,
    useCreateController,
} from 'ra-core';
import {
    BooleanInput,
    DateField,
    Create,
    CreateProps,
    FormWithRedirect,
    useSaveContext,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    useRefresh,
    useNotify,
    useRedirect,
    SimpleForm,
    TextInput,
    required,
    NumberInput,
    useCreateContext,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import clsx from 'clsx';
import DOMPurify from 'dompurify';

import { Mail, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';
import Toolbar from './Toolbar'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import { Storage, Create_Mail_Cached } from '../utils/storage'

const useStyles = makeStyles(theme => ({
    root: {
        '& form': {
            paddingTop: 15,
            margin: '10px 15px',
        },

        '&>div': {
            marginTop: 0,
        },
        '& .MuiCardContent-root': {
            padding: 0,
        },
        '& .ra-input-Assets, & .ra-input-Amount, & .ra-input-Price': {
            display: 'inline-block',

            '& .MuiOutlinedInput-root': {
                width: '100%',
            },

            '& .MuiFormHelperText-contained': {
                left: 0,
            },
        },
        '& .MuiToolbar-regular': {
            background: 'none',
            padding: 0,
            margin: 0,
            minHeight: 'auto',
            textAlign: 'right',

            '&>div': {
                display: 'inline-block',
            },
            '& button': {
                // height: '38px',
                // lineHeight: '38px',
                // padding: '0 15px',
                // borderRadius: '10px',
                // fontSize: '16px',
                // color: '#fff',
                // transition: 'transform 0.3s ease',
                // textTransform: 'none',

                // '&:not(.Mui-disabled)': {
                //     backgroundColor: '#FA6755',

                //     '&:hover': {
                //         transform: 'scale(1.1)',
                //         backgroundColor: '#FA6755',
                //     },
                // }
            },
            '& span': {
                padding: 0,
            },
        },
    },
    subtitle: {
        fontSize: '18px',
        color: '#666',
        fontWeight: 600,
    },
    nolabel: {
        '&.custom-input': {
            width: '210px',
            marginRight: '48px',
            display: 'inline-block',
            // overflow: 'hidden',
        },

        '& .MuiSelect-nativeInput[value=""]': {
            padding: '0 14px',
            top: 0,
            opacity: 1,
            fontSize: '16px',
            border: 'none',
            background: 'transparent',

            '&::placeholder, &::-webkit-input-placeholder': {
                color: 'rgba(0, 0, 0, 0.87)',
                // for select
                opacity: '0.42!important',
            },
        },

        // for input
        '& label[data-shrink=false] + .MuiInputBase-formControl  input::placeholder, & label[data-shrink=false] + .MuiInputBase-formControl  input::-webkit-input-placeholder': {
            opacity: '0.42!important',
        },

        '&.pl-100': {
            paddingLeft: '100px',
        },

        '& .MuiInputLabel-outlined': {
            display: 'none',
        }
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
}));

const richTextOptions = {
    modules: {
        // https://quilljs.com/docs/modules/toolbar/
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['link', 'bold', 'italic', 'underline'],        // toggled buttons
            [{ 'align': [] }],
        ],
        history: { // History module
            delay: 2000,
            maxStack: 500,
            userOnly: true
        }
    },
    theme: "snow"
}

const InboxCreate: FC<CreateProps> = props => {
    // const createContext = useCreateContext();
    const classes = useStyles();
    const [initedValues, setInitedValues] = useState(() => ({}))
    const richText = useRef(null);

    const email = useSelector((state: AppState) => state.email);

    const transform = data => ({
        ...data,
        // @TODO: the email should get from the use request
        dm_email_path: email,
        dm_from: `${email.replace('@ic.dmail.ai', '')}  <${email}>`,
        // @TODO: will use the html after soon
        dm_content: data?.dm_content ? DOMPurify.sanitize(data.dm_content, { ALLOWED_TAGS: [] }) : '',
    })

    const notify = useNotify();
    // const redirect = useRedirect();
    // const refresh = useRefresh();

    const onSuccess = () => {
        notify(`resources.reviews.notification.created_success`, 'success');
        // Go to the list page, shouldn't have two actions together: redirect and refresh. So use the location.href
        // redirect('/mails');
        // refresh();
        window.location.href = window.location.href.replace('mails/create', 'sents')
    };

    const onSaveInputValue = (name: string) => (ev: any) => {
        let cached = Storage.get(Create_Mail_Cached);
        if (!cached) {
            cached = {}
        }
        cached[name] = ev.currentTarget.value
        Storage.set(Create_Mail_Cached, cached);
    }

    useEffect(() => {
        const cached = Storage.get(Create_Mail_Cached);
        if (cached) {
            setInitedValues(() => cached)
        }


    }, [])

    return (
        <Create {...props} title="Compose" className={classes.root} transform={transform} onSuccess={onSuccess}>
            <SimpleForm variant="outlined" toolbar={<Toolbar />} initialValues={initedValues}>
                {/* @TODO: dm_to must be email */}
                <TextInput source="dm_to" className="custom-input" validate={required()} label='Account' onChange={onSaveInputValue('dm_to')} />
                <TextInput source="dm_subject" className="custom-input" validate={required()} label='Subject' onChange={onSaveInputValue('dm_subject')} />
                <RichTextInput source="dm_content" label="Content" validate={required()} options={richTextOptions} ref={richText} />
                <Typography variant="h6" gutterBottom className={classes.subtitle}>
                    Select Asset
                </Typography>
                <SelectInput source="Assets" placeholder="Assets" className={clsx(classes.nolabel, "pl-100", "custom-input")} choices={[
                    { id: 'cidco', name: 'Didco' },
                    { id: 'aic', name: 'Aic' },
                    { id: 'doge', name: 'Doge' },
                ]} />
                <NumberInput
                    source="Amount"
                    className={clsx(classes.nolabel, "custom-input")}
                    // validate={required()}
                    label="Amount"
                    placeholder="Amount"
                />
                <TextInput
                    source="Price"
                    className={clsx(classes.nolabel, "custom-input")}
                    // validate={required()}
                    label="Price"
                    placeholder="Price"
                />
            </SimpleForm>
        </Create>
    );
};

export default InboxCreate;
