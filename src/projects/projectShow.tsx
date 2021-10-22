import * as React from 'react';
import { FC } from 'react';
import {
    BooleanInput,
    DateField,
    Show,
    ShowProps,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    EditContextProvider,
    useTranslate,
    TextInput,
    SimpleForm,
    EditProps,
    SimpleShowLayout,
    RichTextField,
    FieldProps,
    useShowController,
    SaveButton,
    DeleteButton,
    Button,
    useRedirect,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
    Avatar,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Project, Customer } from '../types';
import Totals from './Totals';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import RichTextInput from 'ra-input-rich-text';
import SubIcon from '@material-ui/icons/TurnedInNotRounded';

interface ProjectTitleProps {
    record?: Project;
}

const Projectitle: FC<ProjectTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.commands.title', {
                reference: record.reference,
            })}
        </span>
    ) : null;
};


const CustomerField: FC<FieldProps<Customer>> = ({ record }) =>
    record ? (
        <Typography>
            <Avatar src={`${record.avatar}?size=32x32`} />{record.first_name} {record.last_name}({record.email})
        </Typography>
    ) : null;


const useStyles = makeStyles(theme => ({
    root: {
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    content:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentdiv:{
        width: '200px',
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
    spacer: { height: 20 },
    invoices: { margin: '10px 0' },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    bold: { fontWeight: 'bold' },
}));


const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton />
        <DeleteButton undoable={false} />
    </Toolbar>
);


const Spacer = () => <Box m={1}>&nbsp;</Box>;




const ProjectShow: FC<ShowProps> = props => {
    const classes = useStyles();
    const { record } = useShowController<Project>(props);
    const redirect = useRedirect();
    const onReply  = () => {
        redirect('edit','./');
    };

    const SenderField: FC<FieldProps<Project>> = ({ record }) =>
    record ? (
        <Typography>
            <div className={classes.bold}><Avatar src={`${record.assets.icon}?size=32x32`} />{record.projectname} ({record.canister})</div>
        </Typography>
    ) : null;

    if (!record) return null;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="h6" gutterBottom>
                           {record.projecttitle}
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SenderField record={record}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography   gutterBottom align="left">
                            Start:{record.startdate}
                        </Typography>
                        <Typography   gutterBottom align="left">
                            End:{record.enddate}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography   gutterBottom align="right">
                            <IconButton onClick={onReply}>
                                <SubIcon />
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography   gutterBottom align="left">
                            Start:{record.startdate}
                        </Typography>
                        <Typography   gutterBottom align="left">
                            End:{record.enddate}
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <div className={classes.spacer}>&nbsp;</div>

                <Grid container spacing={2} className={classes.content}>
                     <div dangerouslySetInnerHTML={{ __html: record.content }}/>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <Typography  gutterBottom>
                            Attachments
                </Typography>
                <Box>
                    
                </Box>
                <Spacer />
            </CardContent>
        </Card>
    );
};

export default ProjectShow;
