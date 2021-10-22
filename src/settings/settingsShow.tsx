import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

import { makeStyles } from '@material-ui/core/styles';
import Email from './email'
import Wallet from './wallet'

const useStyles = makeStyles(
  theme => ({
    root: {
      padding: '20px 34px 34px',
      overflow: 'hidden',
      boxShadow: 'none',
      borderRadius: '24px',
      backgroundColor: '#fff',
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
  }));

const tabs = [
  { id: 'email', name: 'EMAIL ACCOUNT' },
  { id: 'wallet', name: 'WALLET ACCOUNT' },
];

interface Props { }

const Show: FC<Props> = props => {
  const classes = useStyles();

  const path = useSelector((state: AppState) => {
    const location = state?.router?.location;
    return location.pathname || ''
  });
  const aPath = path.split('/');
  const [currentTab, setCurrentTab] = useState<string>(aPath.length > 3 ? aPath[3] : 'email');
  const onChangeTab = (event: React.ChangeEvent<{}>, value: any) => {
    setCurrentTab(value);
  }

  useEffect(() => {
    // console.log('currentTab', currentTab);
    window.history.replaceState(null, '', `/#/settings/show/${currentTab}`);
  }, [currentTab])

  return (
    <div className={classes.root}>
      <Tabs
        variant="scrollable"
        value={currentTab}
        indicatorColor="primary"
        onChange={onChangeTab}
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
      <div>
        {currentTab === 'wallet' ? <Wallet /> : <Email />}
      </div>
    </div>
  );
};

export default Show;
