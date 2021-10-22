import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import {
//   useNotify,
//   useRedirect,
// } from 'react-admin';

const useStyles = makeStyles(
  theme => ({
    modal: {
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'none',

      '& .modal-mask': {
        height: '100%',
        backgroundColor: 'rgba(40, 15, 15, .3)',
      },
      '& .modal-wrap': {
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translateX(-50%) translateY(-50%)',
        minWidth: '400px',
        boxShadow: '0px 7px 15px 3px rgba(40, 15, 15, 0.15)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        padding: '40px',
      },
      '& .modal-title': {
        fontSize: '26px',
        fontWeight: 600,
        color: '#153F5D',
        marginBottom: '40px',
        textAlign: 'center',
      },
      '& .modal-body': {
        height: '100%',
      },
      '& .modal-form': {
        minWidth: '620px',
      },
      '& .modal-form-item': {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',

        '& label': {
          minWidth: '200px',
          textAlign: 'right',
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#666666',
          marginRight: '20px',
        },
      },
      '& .modal-form-input': {
        position: 'relative',

        '& input': {
          width: '270px',
          lineHeight: '40px',
          padding: '0 15px',
          border: 'none',
          background: '#F7F6F4',
          borderRadius: '8px',
          fontSize: '16px',
        }
      },
      '& .modal-footer': {
        marginTop: '48px',
      },
      '& .modal-btn': {
        textAlign: 'center',

        '& a': {
          display: 'inline-block',
          color: '#fff',
          height: '42px',
          lineHeight: '42px',
          marginRight: '100px',
          padding: '0 30px',
          fontSize: '18px',
          transition: 'transform 0.3s ease',
          borderRadius: '8px',
          textTransform: 'none',
          backgroundColor: '#FA6755',
          cursor: 'pointer',
          boxSizing: 'border-box',
          fontWeight: 'bold',

          '&:last-child': {
            marginRight: '0',
            backgroundColor: '#bbb',

            '&:hover': {
              backgroundColor: '#FA6755',
            }
          },

          '&:hover': {
            transform: 'scale(1.05)'
          }
        }
      },
    }
  }));


interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}
const Modal: FC<Props> = ({ visible, setVisible }) => {
  const classes = useStyles();

  const onOk = () => {
    // do something;
    setVisible(false);
  }
  const onCancel = () => setVisible(false);

  return (
    <div className={classes.modal} style={{ display: visible ? 'block' : 'none' }}>
      <div className="modal-mask"></div>
      <div className="modal-wrap">
        <div className="modal-title">Sell Information</div>
        <div className="modal-body">
          <div className="modal-form">
            <div className="modal-form-item">
              <label>NFT Name:</label>
              <div className="modal-form-input"><input /></div>
            </div>
            <div className="modal-form-item">
              <label>Sell Price:</label>
              <div className="modal-form-input"><input /></div>
            </div>
            <div className="modal-form-item">
              <label>NFT Introduce:</label>
              <div className="modal-form-input"><input /></div>
            </div>
            <div className="modal-form-item">
              <label>Owner:</label>
              <div className="modal-form-input"><input /></div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="modal-btn">
            <a onClick={onOk}>Submit</a>
            <a onClick={onCancel}>Cancel</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;