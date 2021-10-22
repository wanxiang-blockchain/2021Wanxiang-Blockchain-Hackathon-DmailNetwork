import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
    useRedirect,
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
    useGetList,
    useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer } from '../types';
import Empty from '../components/empty'
import PostPagination from '../components/pagination'
import BulkActionButtons from '../components/BulkActionButtons'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';

const TrashFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />

    </Filter>
);

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const tabs = [
    { id: 'trash', name: 'Trash' },
];

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalTrash } = useGetList(
        'trashs',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'trash' }
    );

    return {
        trash: totalTrash
    };
};

const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [trash, setTrash] = useState<Identifier[]>([] as Identifier[]);

    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'trash':
                    setTrash(ids);
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

    const selectedIds = trash;

    return (
        <Fragment>
            {/* <Divider /> */}
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'trash' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: trash }}
                        >
                            <Datagrid {...props} empty={<Empty />} optimized rowClick="show">
                                {/* the email from sent or inbox should have a distinguish */}
                                <TextField source="from" label="sender" headerClassName={classes.total} />
                                <TextField source="subject" headerClassName={classes.total} />
                                <DateField source="date" locales="en-US" showTime headerClassName={classes.total} />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const TrashList: FC<ListProps> = props => {
    const emailname = useSelector((state: AppState) => state.email);
    const redirect = useRedirect();
    if (!emailname) {
        window.confirm('Pelease set Mailbox alias first');
        redirect('./settings/show/email')
    }

    return (
        <List
            {...props}
            filterDefaultValues={{
                status: 'trash',
                emailname
            }}
            sort={{ field: 'date', order: 'DESC' }}
            perPage={25}
            exporter={false}
            // filters={<TrashFilter />}
            // delete MuiToolbar
            actions={false}
            pagination={<PostPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <TabbedDatagrid />
        </List>
    )
};

export default TrashList;
