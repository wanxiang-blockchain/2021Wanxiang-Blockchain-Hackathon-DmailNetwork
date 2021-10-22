import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
// import Select, { SelectChangeEvent } from '@material-ui/Select';

import {
  useNotify,
  useDeleteMany,
  useRefresh,
  useUnselectAll,
  useListContext,
  CRUD_DELETE_MANY,
  useResourceContext,
  BulkActionProps,
  // BulkDeleteWithConfirmButton,
  // BulkDeleteWithUndoButton,
  // BulkDeleteWithConfirmButtonProps,
  // BulkDeleteWithUndoButtonProps,
} from 'react-admin'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

/**
 * Deletes the selected rows.
 *
 * To be used inside the <List bulkActionButtons> prop (where it's enabled by default).
 *
 * @example // basic usage
 * import * as React from 'react';
 * import { Fragment } from 'react';
 * import { BulkDeleteButton, BulkExportButton } from 'react-admin';
 *
 * const PostBulkActionButtons = ({ basePath }) => (
 *     <Fragment>
 *         <BulkExportButton />
 *         <BulkDeleteButton basePath={basePath} />
 *     </Fragment>
 * );
 *
 * export const PostList = (props) => (
 *     <List {...props} bulkActionButtons={<PostBulkActionButtons />}>
 *         ...
 *     </List>
 * );
 */

export const useStyles = makeStyles(theme => ({
  btn: {
    position: 'relative',

    '&:last-child > span': {
      marginRight: '0',
    },

    '& > span': {
      height: '30px',
      lineHeight: '30px',
      padding: '0 10px',
      borderRadius: '5px',
      backgroundColor: '#FA6755',
      color: '#fff',
      transition: 'transform 0.3s ease',
      marginRight: '16px',
      cursor: 'pointer',
      display: 'block',

      '&:hover': {
        transform: 'scale(1.05)',
        backgroundColor: '#FA6755',
      },
    },

    '& .disabled': {
      backgroundColor: '#ccc',
      cursor: 'default',

      '&:hover': {
        transform: 'none',
        backgroundColor: '#ccc',
      },
    },

    '& ._js_more': {
      fontSize: '14px',
    }
  },
  hide: {
    display: 'none',
  },
  drops: {
    position: 'absolute',
    top: '100%',
    left: 0,
    boxShadow: '0px 5px 5px -3px rgb(0, 0, 0, 0.2), 0px 8px 10px 1px rgb(0, 0, 0,  0.14), 0px 3px 14px 2px rgb(0, 0, 0,  0.12)',
    padding: '8px 0',
    borderRadius: '4px',
    background: '#fff',

    '& a': {
      display: 'block',
      overflow: 'hidden',
      fontSize: '16px',
      lineHeight: 1.5,
      padding: '6px 20px',
      color: 'rgba(0, 0, 0, 0.54)',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        color: '#FA6755',
      }
    }
  },
}));

// see /node_modules/ra-ui-materialui/src/button/BulkDeleteWithUndoButton.tsx
export const BulkDeleteButton: FC<BulkDeleteButtonProps> = ({ undoable, ...props }) => {
  const classes = useStyles();

  const [showMore, toggleMore] = React.useState(false)
  const notify = useNotify();
  const refresh = useRefresh();
  const resource = useResourceContext(props);
  // console.log(resource)
  const unselectAll = useUnselectAll();
  const { selectedIds } = useListContext(props);
  const onFailure = error => {
    notify(
      typeof error === 'string'
        ? error
        : error.message || 'ra.notification.http_error',
      'warning',
      {
        _:
          typeof error === 'string'
            ? error
            : error && error.message
              ? error.message
              : undefined,
      }
    )
  }
  const [deleteMany, { loading }] = useDeleteMany(resource, selectedIds, {
    action: CRUD_DELETE_MANY,
    onSuccess: () => {
      unselectAll(resource);
      refresh();
      notify(`resources.reviews.notification.deleted_success`, 'success');
    },
    onFailure,
    // undoable: true,
  });
  const onDel = () => {
    if (!selectedIds.length) {
      return;
    }

    deleteMany()
  }
  const onMove = () => {
    notify(`resources.reviews.notification.moved_success`, 'success');
    refresh();
    unselectAll(resource);
  }
  // TODO: should complete
  const onCopy = () => {
    notify(`resources.reviews.notification.copyed_success`, 'success');
    refresh();
    unselectAll(resource);
  }
  const onForward = () => {
    notify(`resources.reviews.notification.forwarded_success`, 'success');
    refresh();
    unselectAll(resource);
  }

  const moreClick = React.useCallback((ev) => {
    if (!ev.target.classList.contains('_js_more')) {
      toggleMore(false)
    }
  }, [showMore]);
  React.useEffect(() => {
    document.body.addEventListener('click', moreClick)

    return () => {
      document.body.removeEventListener('click', moreClick)
    }
  }, [moreClick])


  return (
    <>
      {/* {undoable ? <BulkDeleteWithUndoButton className={classes.btn} {...props} /> : <BulkDeleteWithConfirmButton className={classes.btn} {...props} />} */}
      <div className={classes.btn}>
        <span className={clsx(selectedIds.length ? '' : 'disabled', "_js_more")} onClick={onDel}>DELETE</span>
      </div>
      <div className={classes.btn}>
        <span className={clsx(selectedIds.length ? '' : 'disabled', "_js_more")} onClick={() => selectedIds.length && toggleMore(!showMore)}>MORE</span>
        <div className={clsx(classes.drops, showMore ? '' : classes.hide)}>
          <a onClick={onMove}>move</a>
          <a onClick={onCopy}>copy</a>
          <a onClick={onForward}>forward</a>
        </div>
      </div>
    </>
  )
}

// export type BulkDeleteButtonProps = Props &
// (BulkDeleteWithUndoButtonProps | BulkDeleteWithConfirmButtonProps);

interface BulkDeleteButtonProps extends BulkActionProps {
  undoable?: boolean;
}

BulkDeleteButton.propTypes = {
  // basePath: PropTypes.string,
  // label: PropTypes.string,
  resource: PropTypes.string,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
  undoable: PropTypes.bool,
};

BulkDeleteButton.defaultProps = {
  undoable: true,
};


const BulkActionButtons = props => <BulkDeleteButton {...props} />;

export default BulkActionButtons;
