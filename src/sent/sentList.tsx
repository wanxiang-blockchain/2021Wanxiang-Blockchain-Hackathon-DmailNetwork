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
    Pagination,
    useGetList,
    useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer } from '../types';
import Empty from '../components/empty'
import PostPagination from '../components/pagination'
import BulkActionButtons from '../components/BulkActionButtons'

const SentFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />

    </Filter>
);

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const tabs = [
    { id: 'sent', name: 'Sent' },
];

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalSent } = useGetList(
        'sents',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'sent' }
    );

    return {
        sent: totalSent
    };
};

const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [sent, setSent] = useState<Identifier[]>([] as Identifier[]);

    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'sent':
                    setSent(ids);
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

    const selectedIds = sent;

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
                    {filterValues.status === 'sent' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: sent }}
                        >
                            <Datagrid {...props} empty={<Empty />} optimized rowClick="show">
                                <TextField source="to" label='Recipient' headerClassName={classes.total} />
                                <TextField source="subject" headerClassName={classes.total} />
                                <DateField source="date" headerClassName={classes.total} />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const SentList: FC<ListProps> = props => {
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
                status: 'sent',
                emailname,
            }}
            sort={{ field: 'date', order: 'DESC' }}
            perPage={25}
            exporter={false}
            // filters={<SentFilter />}
            // delete MuiToolbar
            actions={false}
            pagination={<PostPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <TabbedDatagrid />
        </List>
    )
};

export default SentList;
