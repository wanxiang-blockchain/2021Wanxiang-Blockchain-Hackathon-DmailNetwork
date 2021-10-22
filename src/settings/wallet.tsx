import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement } from 'react';
import Empty from '../components/empty'
import { makeStyles } from '@material-ui/core/styles';
import l1 from '../assets/red/1.png';
import l2 from '../assets/red/2.png';
import l3 from '../assets/red/3.png';
import l4 from '../assets/red/4.png';
import l5 from '../assets/red/5.png';
import l6 from '../assets/red/6.png';
import l7 from '../assets/red/7.png';
import l8 from '../assets/red/8.png';

const useStyles = makeStyles(
  theme => ({
    root: {

    },
    empty: {
      minHeight: 'auto',
      paddingTop: '50px',

      '& img': {
        width: 120,
      },
    },

    container: {
      padding: '30px 30px 40px',
      marginTop: '50px',
      border: '2px dashed #BFBFBF',
      backgroundColor: '#F2F2F2',
      borderRadius: '10px',
    },

    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#083353',
    },
    list: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',

      '& li': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 15px',
        width: '21%',
        marginTop: '30px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxSizing: 'border-box',
        boxShadow: '0px 6px 7px 1px rgba(206, 186, 186, 0.39)',
        fontSize: '16px',
        fontWeight: 'normal',
        border: '1px solid transparent',
        cursor: 'pointer',

        '&:hover': {
          borderColor: '#FF9B86',
          boxShadow: 'none',
        },

        '& img': {
          width: '66px',
          height: '66px',
        }
      }

    }

  }));

interface Props {

}
const Wallet: FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Empty propClass={classes.empty} />
      <div className={classes.container}>
        <div className={classes.title}>
          Choose your Blockchain and connect your wallet
          <ul className={classes.list}>
            <li>
              <img src={l1} />
              <span>Dfinity</span>
            </li>
            <li>
              <img src={l2} />
              <span>BSC</span>
            </li>
            <li>
              <img src={l3} />
              <span>Polygon</span>
            </li>
            <li>
              <img src={l4} />
              <span>Cardano</span>
            </li>
            <li>
              <img src={l5} />
              <span>Solana</span>
            </li>
            <li>
              <img src={l6} />
              <span>Ethereum</span>
            </li>
            <li>
              <img src={l7} />
              <span>MetaMask</span>
            </li>
            <li>
              <img src={l8} />
              <span>Binance Chain</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Wallet;