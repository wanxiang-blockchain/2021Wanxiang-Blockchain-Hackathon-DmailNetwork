import React, {
    useState,
    useEffect,
    useCallback,
    FC,
    CSSProperties,
} from 'react';
import { useVersion, useDataProvider, useRedirect } from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { subDays } from 'date-fns';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewCustomers from './NewCustomers';
import OrderChart from './OrderChart';

import { Customer, Order, Review } from '../types';

interface OrderStats {
    revenue: number;
    nbNewOrders: number;
    pendingOrders: Order[];
}

interface CustomerData {
    [key: string]: Customer;
}

interface State {
    nbNewOrders?: number;
    nbPendingReviews?: number;
    pendingOrders?: Order[];
    pendingOrdersCustomers?: CustomerData;
    pendingReviews?: Review[];
    pendingReviewsCustomers?: CustomerData;
    recentOrders?: Order[];
    revenue?: string;
}

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard: FC = () => {
    const redirect = useRedirect();
    redirect('./mails');


    return (
        <div>
            <div style={styles.flexColumn as CSSProperties}>
                <Welcome />
            </div>
        </div>
    );
};

export default Dashboard;
