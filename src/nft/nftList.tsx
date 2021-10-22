import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement } from 'react';
import {
  List,
  ListContextProvider,
  ListProps,
} from 'react-admin';
import Content from './content';

interface Props {

}
const NftList: FC<ListProps> = props => (
  <List
    {...props}
    filterDefaultValues={{ status: 'auction' }}
    sort={{ field: 'date', order: 'DESC' }}
    perPage={20}
    exporter={false}
    actions={false}
    pagination={false}
    bulkActionButtons={false}
  >
    <Content />
  </List>
);

export default NftList;