import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  useNotify,
  useGetList,
  useRedirect,
  useListContext,
} from 'react-admin';
import { tags, priceTypes } from './utils';
import test from '../assets/test/test1.jpeg';
import email from '../assets/red/nft-email.png';
import date from '../assets/red/nft-date.png';
import dapper from '../assets/red/nft-dapper.png';
import type from '../assets/red/6.png';
import dmail from '../assets/red/d.png';
import dbg from '../assets/red/dbg.jpg';
import down from '../assets/red/down3.png';
// import transparent from '../assets/red/transparent.png';

import Modal from './modal'

const useStyles = makeStyles(
  theme => ({
    root: {

    },
    desc: {
      fontSize: '16px',
      color: '#999',
      lineHeight: '24px',
    },
    tags: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontSize: '16px',
      marginTop: '30px',

      '&>div': {
        display: 'flex',
        alignItems: 'center',
      },

      '& select, & input': {
        height: '28px',
        lineHeight: '28px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        padding: '0 12px',
        fontSize: '14px',
      },

      '& select': {
        width: '165px',
        marginRight: '72px',
      },

      '& input': {
        width: '100px',
      },

      '& .search': {
        marginLeft: '20px',

        '& a': {
          display: 'inline-block',
          color: '#fff',
          height: '28px',
          lineHeight: '28px',
          padding: '0 15px',
          fontSize: '14px',
          transition: 'transform 0.3s ease',
          borderRadius: '5px',
          textTransform: 'none',
          backgroundColor: '#FA6755',
          cursor: 'pointer',

          '&:hover': {
            transform: 'scale(1.05)'
          }
        }
      },

      '& p': {
        margin: '0 20px',
        fontSize: '12px',
        color: 'rgba(8, 51, 83, 0.5)',
        display: 'inline-block',
      },

      '& strong': {
        width: '82px',
        display: 'inline-block',
        textAlign: 'right',
        marginRight: '35px',
        color: 'rgba(8, 51, 83, 1)',
      },

      '& span': {
        marginRight: '50px',
        color: 'rgba(8, 51, 83, 0.5)',
        cursor: 'pointer',
        verticalAlign: 'middle',
      },
      '& .more': {
        display: 'inline-block',
        width: '20px',
        height: '11px',
        background: `url(${down}) no-repeat`,
        backgroundSize: '100%',
        transition: 'transform 0.3s ease-in-out 0s',
        transformOrigin: 'center center',
        cursor: 'pointer',
      },
      '& .more.up': {
        transform: 'rotate(180deg)',
      },

      '& .on': {
        color: 'rgba(8, 51, 83, 1)',
      },
      '& a': {
        color: '#FF5745',
        cursor: 'pointer',
      },
    },
    list: {
      marginTop: '30px',

      '& ul': {
        display: 'flex',
        flexWrap: 'wrap',
      },

      '& li': {
        flex: 1,
        // let 4 li one line
        minWidth: '21%',
        maxWidth: '25%',
        marginRight: '30px',
        marginBottom: '40px',
        boxShadow: '0px 7px 7px 0px rgba(217, 216, 215, 0.58)',
        borderRadius: '10px',
        cursor: 'pointer',

        '&:nth-child(4n)': {
          marginRight: 0,
        }
      },

      '& .dmail': {
        borderRadius: '10px 10px 0 0',
        backgroundColor: '#FFC5BE',
        position: 'relative',

        '&::after': {
          content: '""',
          width: '88px',
          height: '109px',
          background: `url(${dmail}) no-repeat`,
          backgroundSize: '100%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        },
      },

      '& img': {
        width: '100%',
        display: 'block',
        borderRadius: '10px 10px 0 0',
      },

      '& .content': {
        padding: '5px 16px 15px',
      },

      '& .info': {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#727A82',
        fontSize: '14px',
      },

      '& p': {
        display: 'flex',
        alignItems: 'center',
        lineHeight: '16px',
        marginTop: '5px',

        '& i': {
          width: '20px',
          height: '20px',
          marginRight: '6px',
          display: 'inline-block',
          background: `url(${email}) no-repeat`,
          backgroundSize: '100%',
        },

        '& .date': {
          backgroundImage: `url(${date})`,
        },

        '& .dapper': {
          backgroundImage: `url(${dapper})`,
        },

        '& .type': {
          backgroundImage: `url(${type})`,
        },
      },

      '& .right': {
        color: '#A5A5A5',
        // lineHeight value is equal the icon height
        lineHeight: '20px',

        '& i': {
          marginRight: '0',
        },

        '& span': {
          color: '#343434',
          fontSize: '18px',
        },
      },
      '& .action': {
        marginTop: '12px',
        textAlign: 'center',

        '& a': {
          display: 'inline-block',
          color: '#fff',
          height: '30px',
          lineHeight: '30px',
          padding: '0 25px',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'transform 0.3s ease',
          borderRadius: '8px',
          textTransform: 'none',
          backgroundColor: '#FA6755',
          cursor: 'pointer',

          '&:hover': {
            transform: 'scale(1.05)'
          }
        }
      }
    },
  }));

interface Props {
  name: string;
}
const Page: FC<Props> = ({ name }) => {
  const classes = useStyles();
  const [tag, setTag] = useState<number | string>(tags.length ? tags[0].value : 0);
  const onSelectTag = (tag: number | string) => () => {
    setTag(tag)
  }
  const [filterTags, setFilterTags] = useState([...tags.slice(0, 4)]);
  const [moreTag, setMoreTag] = useState(true);
  useEffect(() => {
    setFilterTags(moreTag ? [...tags.slice(0, 4)] : [...tags])
  }, [moreTag]);

  const [priceSelect, setPriceSelect] = useState<number | string>(priceTypes[0].value);
  const onPriceSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSelect(e.currentTarget.value);
  }
  // TODO: Make sure the thumb width and height rate is immutable.
  const { data, ids, filterValues } = useListContext();

  // just fix the css layout
  const [placeholderList, setPlaceholderList] = useState<any[]>([])
  useEffect(() => {
    setPlaceholderList(Array.from(Array(4 - ids.length % 4).fill('')));
  }, [ids]);

  // const notify = useNotify();
  const redirect = useRedirect();
  // @TODO: consider the onSubmit
  const onWant = () => {
    redirect('show', './nfts', name);
  };

  const btnText = name === 'auction' ? 'Auction' : name === 'sell' ? 'Buy' : 'Cancel'

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const setVisible = (visible: boolean) => setModalVisible(visible);
  const onSubmit = (name: string, item: any) => (e: React.MouseEvent<Element>) => {
    if (name === 'my' && !item.isEmail) {
      setModalVisible(true);
      e.stopPropagation();
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.desc}>
        NFT is the abbreviation of non homogenous token. The biggest feature is that it is not interchangeable. Each token is different. One of the origins of NFT can be traced back to the encrypted cat game in 2017, which is used to represent the different colors, genes, generations and other information owned by each cat. At present, NFT is mainly used to encrypt the issuance and circulation of works of art, virtual land, game props, tickets and other fields. NFT market zone is the basic platform to support the auction and secondary sale of NFT assets.
      </div>
      {name !== 'my' ?
        <>
          <div className={classes.tags}>
            <div>
              <strong>NFT Type:</strong>
              {filterTags.map(({ label, value }: { label: string, value: number | string }, index: number) => (
                <>
                  <span key={value} className={tag === value ? "on" : ""} onClick={onSelectTag(value)}>
                    {label}
                  </span>
                  {index === filterTags.length - 1 ? <i className={moreTag ? "more down" : 'more up'} onClick={() => setMoreTag(!moreTag)}></i> : null}
                </>
              ))}
            </div>
            {/* <a>Put Away</a> */}
          </div>
          <div className={classes.tags}>
            <div>
              <strong>Price:</strong>
              <select value={priceSelect} onChange={onPriceSelectChange}>
                {priceTypes.map(({ label, value }: { label: string, value: number | string }) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
              <div className="minToMax">
                <input placeholder="min" />
                <p>to</p>
                <input placeholder="max" />
              </div>
              <div className="search">
                <a>Search</a>
              </div >
            </div>
          </div>
        </>
        :
        null
      }
      <div className={classes.list}>
        <ul>
          {Object.values(data).map((item, key) => (
            <li key={key} onClick={onWant}>
              {item.isEmail ?
                <div className="dmail">
                  <img src={dbg} />
                </div>
                :
                <div className="thumb">
                  <img src={item.thumb} />
                </div>
              }
              <div className="content">
                <div className="info">
                  <p className="left">
                    <i className={item.isEmail ? "email" : "dapper"}></i><span>{item.subject} #{item.id}</span>
                  </p>
                  <p className="right">
                    Price
                  </p>
                </div>
                <div className="info">
                  <p className="left">
                    <i className="date"></i><span>{item.time}</span>
                  </p>
                  <p className="right">
                    <i className="type"></i><span>{item.price}</span>
                  </p>
                </div>
                <div className="action">
                  <a onClick={onSubmit(name, item)}>{name === 'my' && !item.isEmail ? 'Sale out' : btnText}</a>
                </div>
              </div>
            </li>
          ))}
          {placeholderList.map((item, key) => (<li style={{ visibility: 'hidden' }} key={key} />))}
        </ul>
      </div>
      <Modal visible={modalVisible} setVisible={setVisible} />
    </div>
  )
}

export default Page;