import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ShowProps,
  useShowController,
} from 'react-admin';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '34px',
    overflow: 'hidden',
    boxShadow: 'none',
    borderRadius: '24px',
    backgroundColor: '#fff',
  },
  header: {
    paddingBottom: '30px',
    borderBottom: '1px solid #f3f3f3',
    marginBottom: '40px',
  },
  title: {
    fontSize: '22px',
    marginBottom: '20px',
    fontWeight: 'bold',
    lineHeight: '30px',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  users: {
    '& span': {
      margin: '0 10px',
      color: '#FA6755',
    }
  },
  time: {
    fontSize: '14px',
    color: '#999',
  },
  body: {
    lineHeight: '24px',
    minHeight: '400px',
  },

}));

const Show: FC<ShowProps> = props => {
  const classes = useStyles();
  const { record } = useShowController(props);

  if (!record) return null;
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.title}>
          {record.subject}
        </div>
        <div className={classes.info}>
          <div className={classes.users}>
            from
                      <span>{record.from}</span>
                      to
                      <span>{record.to}</span>
          </div>
          <div className={classes.time}>
            {record.date}
          </div>
        </div>
      </div>
      <div className={classes.body} dangerouslySetInnerHTML={{ __html: record.content || '' }}>
      </div>
    </div>
  );
};

export default Show;