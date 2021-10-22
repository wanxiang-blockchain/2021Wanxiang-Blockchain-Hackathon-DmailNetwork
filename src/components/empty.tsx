import * as React from 'react';
import empty from '../assets/red/empty.png';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: '500px',
    paddingTop: '40px',

    '& img': {
      width: '200px',
    }
  },
});

const Empty = props => {
  const { propClass, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.empty, propClass || '')}>
      <img src={empty} />
    </div>
  )
}

export default Empty;