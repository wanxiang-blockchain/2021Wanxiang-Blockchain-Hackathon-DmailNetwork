import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState, cloneElement } from 'react';
import {
    BooleanField,
    Datagrid,
    DatagridProps,
    DateField,
    DateInput,
    Filter,
    FilterProps,
    Identifier,
    List,
    ListContextProvider,
    ListProps,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    TextInput,
    useRedirect,
    useGetList,
    useListContext,
    useRecordContext,
    ImageField,
    FieldProps,
    TopToolbar,
    Button,
    BulkDeleteButton,
    Pagination,
    sanitizeListRestProps,
    DeleteButton
} from 'react-admin';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
import { useMediaQuery, Divider, Tabs, Tab, Theme, Avatar, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import MobileGrid from './MobileGrid';
import { Project } from '../types'

import IconSubscriptions from '@material-ui/icons/Subscriptions';
import Empty from '../components/empty'
import PostPagination from '../components/pagination'
import DropDown from '../components/dropDown'
import { useStyles } from '../components/BulkActionButtons'
// import { Storage, Create_Mail_Cached, Email_Name } from '../utils/storage'

const ProjectFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />

    </Filter>
);

const useDatagridStyles = makeStyles(
    theme => ({
        root: {
            '& .MuiTableCell-root': {
                height: 65,
            },
        },
        tabs: {
            display: 'block',
            marginBottom: '25px',
        },
        tab: {
            marginRight: '50px',
            lineHeight: '17px',
            padding: '12px 0',
            fontSize: '17px',
            fontFamily: 'PingFang SC',
            color: '#56677B',
            fontWeight: 600,
            minWidth: 'auto',

            '&.Mui-selected': {
                color: '#153F5D',
                fontWeight: 'bold',
                fontSize: '20px',
            }
        },
        chunk: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        customer: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        total: { fontWeight: 'bold' },
        ava: {
            marginRight: '35px',
        },
        project_avatar: {
            width: 54,
            height: 54,
            borderRadius: '26px',
        },
        project_name: {
            fontSize: '20px!important',
            fontWeight: 'bold',
        },
        // project_avatar: {
        //     width: 55,
        //     height: 55,
        //     borderRadius: 18,
        // },
        total_amm: { fontWeight: 'bold', marginRight: 5 },

    }));

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalProject } = useGetList(
        'projects',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'information' }
    );

    return {
        project: totalProject
    };
};

const tabs = [
    { id: 'information', name: 'Information' },
    { id: 'attetion', name: 'Attetion' },
];


const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    console.log(listContext)
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [project, setProject] = useState<Identifier[]>([] as Identifier[]);

    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'information':
                    setProject(ids);
                    break;
            }
        }
    }, [ids, filterValues.status]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters
                );
        },
        [displayedFilters, filterValues, setFilters]
    );


    const CustomerTotalField: FC<FieldProps<Project>> = props => (
        props.record ? (
            <div className={classes.customer}>
                <TextField source="total" />
                <div className={classes.total}>&nbsp;&nbsp;{props.record.assets.coinname}</div>
            </div>
        ) : null
    );

    const CustomerProjectField: FC<FieldProps<Project>> = ({ record }) =>
        record ? (<div className={classes.chunk}>
            <Typography className={classes.ava}>
                <Avatar className={classes.project_avatar} src={`${record.assets.icon}`} />
            </Typography>
            <Typography
                component="span"
                variant="body2"
                className={classes.project_name}
            >
                {record.projectname}
            </Typography>
        </div>
        ) : null;

    const selectedIds = project;

    return (
        <Fragment>
            <Tabs
                variant="scrollable"
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
                className={classes.tabs}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={choice.name}
                        value={choice.id}
                        className={classes.tab}
                    />
                ))}
            </Tabs>
            {/* <Divider /> */}
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div className={classes.root}>
                    {/* {filterValues.status === 'information' && ( */}
                    <ListContextProvider
                        value={{ ...listContext, ids: project }}
                    >
                        <Datagrid {...props} empty={<Empty />} optimized rowClick="show" hasBulkActions={false}>
                            <CustomerProjectField className={classes.chunk} headerClassName={classes.total} label='Project' />
                            {/* <TextField source="projectname" label='Project' className={classes.total} headerClassName={classes.total} /> */}
                            <TextField source="tags" label='Stage' headerClassName={classes.total} />
                            <TextField source="participated" headerClassName={classes.total} />
                            <TextField source="winners" headerClassName={classes.total} />
                            <CustomerTotalField source="total" label='Total Amount' headerClassName={classes.total} />
                            <DateField source="enddate" label='End Date' headerClassName={classes.total} />
                            <BooleanField source="sub" label='Sub' headerClassName={classes.total} />
                        </Datagrid>
                    </ListContextProvider>
                    {/* )} */}
                </div>
            )}
        </Fragment>
    );
};

// const ListActions = (props) => {
//     const {
//         className,
//         exporter,
//         filters,
//         maxResults,
//         ...rest
//     } = props;
//     const {
//         currentSort,
//         resource,
//         displayedFilters,
//         filterValues,
//         hasCreate,
//         basePath,
//         selectedIds,
//         showFilter,
//         total,
//     } = useListContext();
//     return (
//         <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
//             {filters && cloneElement(filters, {
//                 resource,
//                 showFilter,
//                 displayedFilters,
//                 filterValues,
//                 context: 'button',
//             })}
//             <DeleteButton variant="contained" {...props} />

//         </TopToolbar>
//     );
// };

// const PostBulkActionButtons = props => (
//     <Fragment>
//         <Button variant="contained"
//             onClick={() => { alert('Subscription Projects Success!'); }}
//             label="Subscription"
//         >
//             <IconSubscriptions />
//         </Button>
//     </Fragment>
// );


const useActionsStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
    }));

const dropOptions = [
    {
        label: 'Airdrop',
        value: '1'
    },
    {
        label: 'Defi',
        value: '2'
    },
    {
        label: 'NFT',
        value: '3'
    },
    {
        label: 'GameFi',
        value: '4'
    },
    {
        label: 'Metaverse',
        value: '5'
    },
    {
        label: 'Swap',
        value: '6'
    },
    {
        label: 'DAO',
        value: '7'
    },
    {
        label: 'BSC',
        value: '8'
    },
    {
        label: 'Heco',
        value: '9'
    },
    {
        label: 'Solana',
        value: '10'
    },
]

const BulkActionButtons = (props) => {
    const actionClasses = useActionsStyles();

    return (
        <div className={actionClasses.root}>
            <DropDown options={dropOptions} />
        </div>
    )
};

const useListStyles = makeStyles(
    theme => ({
        root: {
            '& h6': {
                display: 'none',
            },

            '& .MuiToolbar-root[data-test="bulk-actions-toolbar"]': {
                position: 'absolute',
                right: '34px',
                top: '30px',
                flexWrap: 'nowrap',
            },
        },
    }));

const ProjectList: FC<ListProps> = props => {
    const classes = useListStyles();
    // const email = Storage.get(Email_Name);
    const emailname = useSelector((state: AppState) => state.email);
    const redirect = useRedirect();
    if (!emailname) {
        window.confirm('Pelease set Mailbox alias first');
        redirect('./settings/show/email')
    }

    return (
        <List
            {...props}
            className={classes.root}
            filterDefaultValues={{ status: 'information', emailname }}
            sort={{ field: 'enddate', order: 'DESC' }}
            perPage={25}
            exporter={false}
            // filters={<ProjectFilter />}
            // actions={<ListActions />}
            // delete MuiToolbar
            actions={false}
            pagination={<PostPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <TabbedDatagrid />
        </List>
    )
};

export default ProjectList;
