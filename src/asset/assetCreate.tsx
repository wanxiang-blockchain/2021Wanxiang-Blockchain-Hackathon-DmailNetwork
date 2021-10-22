import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
    CreateProps,
    SimpleForm
} from 'react-admin';
import { InputAdornment, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

export const styles = {
    root: {
        '& .w315 .MuiOutlinedInput-root': {
            width: '315px!important',
            flex: 'initial',
        },

        '& form': {
            paddingTop: 15,
            margin: '10px 15px',
        },

        '& .ra-rich-text-input': {
            marginTop: 40,
            paddingLeft: 0,
        },

        '&>div': {
            marginTop: 0,
        },
        '& .MuiCardContent-root': {
            padding: 0,
        },
        '& .ra-input-Assets, & .ra-input-price': {
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

            '&>div': {
                display: 'inline-block',
            },
            '& button': {
                height: '38px',
                lineHeight: '38px',
                padding: '0 15px',
                borderRadius: '10px',
                fontSize: '16px',
                color: '#fff',
                transition: 'transform 0.3s ease',

                '&:not(.Mui-disabled)': {
                    backgroundColor: '#FA6755',

                    '&:hover': {
                        transform: 'scale(1.1)',
                        backgroundColor: '#FA6755',
                    },
                }
            },
            '& svg': {
                display: 'none',
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
};

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

const useStyles = makeStyles(styles);

const AssetCreate: FC<CreateProps> = props => {
    const classes = useStyles();
    return (
        <Create {...props} title="Move Asset" className={classes.root}>
            <SimpleForm variant="outlined">
                <SelectInput className="custom-input w315" source="Assets" choices={[
                    { id: 'cidco', name: 'Didco' },
                    { id: 'aic', name: 'Aic' },
                    { id: 'doge', name: 'Doge' },
                ]} />

                <TextInput className="custom-input w315" source="reference" validate={required()} label='Account' />
                <NumberInput
                    className="custom-input w315"
                    source="price"
                    validate={required()}
                    label="Amount"
                />
                <RichTextInput multiline source="description" label="" options={richTextOptions} />

            </SimpleForm>
        </Create>
    );
};

export default AssetCreate;
