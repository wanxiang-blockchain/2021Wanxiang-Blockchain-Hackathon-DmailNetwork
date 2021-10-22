import { format } from 'date-fns';
import logo from '../assets/red/logo.png';
import loginBg from '../assets/red/login-bg.jpg';
import loginLogo from '../assets/red/login-logo.png';
import subTitle from '../assets/red/sub-title.png';

import compose from '../assets/red/compose.png';
import composeHover from '../assets/red/compose-hover.png';

import inbox from '../assets/red/inbox.png';
import inboxHover from '../assets/red/inbox-hover.png';

import junk from '../assets/red/junk.png';
import junkHover from '../assets/red/junk-hover.png';

import sent from '../assets/red/sent.png';
import sentHover from '../assets/red/sent-hover.png';

import subscription from '../assets/red/subscription.png';
import subscriptionHover from '../assets/red/subscription-hover.png';

import assets from '../assets/red/assets.png';
import assetsHover from '../assets/red/assets-hover.png';

import trash from '../assets/red/trash.png';
import trashHover from '../assets/red/trash-hover.png';

import nft from '../assets/red/nft.png';
import nftHover from '../assets/red/nft-hover.png';

import settings from '../assets/red/settings.png';
import settingsHover from '../assets/red/settings-hover.png';

import search from '../assets/red/search.png';
import prev from '../assets/red/prev.png';
import prevHover from '../assets/red/prev-hover.png';
import circles from '../assets/red/circles.png';
import down2 from '../assets/red/down2.png';
import down3 from '../assets/red/down3.png';

const RaPaginationBottonHover = {
  borderColor: '#FF7669',
  backgroundColor: '#FF7669',
  color: '#fff',
}

const menuItemHovers = {
  '& .menu-item-compose': {
    backgroundImage: `url(${composeHover})`,
  },
  '& .menu-item-inbox': {
    backgroundImage: `url(${inboxHover})`,
  },
  '& .menu-item-junk': {
    backgroundImage: `url(${junkHover})`,
  },
  '& .menu-item-sent': {
    backgroundImage: `url(${sentHover})`,
  },
  '& .menu-item-subscription': {
    backgroundImage: `url(${subscriptionHover})`,
  },
  '& .menu-item-assets': {
    backgroundImage: `url(${assetsHover})`,
  },
  '& .menu-item-trash': {
    backgroundImage: `url(${trashHover})`,
  },
  '& .menu-item-nfts': {
    backgroundImage: `url(${nftHover})`,
  },
  '& .menu-item-settings': {
    backgroundImage: `url(${settingsHover})`,
  },
}

//   // @media screen
// declare module "@material-ui/core/styles/createBreakpoints" {
//   interface BreakpointOverrides {
//     // xs: false; 
//     // sm: false;
//     // md: false;
//     // lg: false;
//     // xl: false;
//     loginHMax: true; 
//   }
// }

export const redTheme = {
  overrides: {
    //   // @media screen
    //   breakpoints: {
    //     values: {
    //       // xs: 0,
    //       // sm: 600,
    //       // md: 960,
    //       // lg: 1280,
    //       // xl: 1920,
    //       loginHMax: 800,
    //     },
    //   },
    MuiContainer: {
      root: {
        '&.login-wrapper': {
          width: '100%',
          height: '100vh',
          background: `url(${loginBg}) center no-repeat`,
          backgroundSize: 'cover',
        },
        '& .login-card': {
          boxShadow: '0 2px 3px 1px rgba(255, 93, 80, .4)'
        },
        '& .login-btn': {
          backgroundColor: '#FF5D50',
          color: '#fff',
        },
        '& .login-logo': {
          backgroundImage: `url(${loginLogo})`,
        },
        '& .login-description': {
          width: '446px',
          height: '20px',
          backgroundImage: `url(${subTitle})`,
        }
      }
    },
    RaLayout: {
      content: {
        padding: '0px!important',
      },
      appFrame: {
        margin: '0px!important',
      },
      root: {
        padding: '30px',
        boxSizing: 'border-box',
        backgroundColor: '#F7F6F4',

        "@media screen and (max-width: 1440px)": {
          padding: '20px',
        },

        '&:fist-child': {
          display: 'none',
        },
        '&:nth-child(2)': {
          margin: 0,
        }
      },
    },

    RaSidebar: {
      paper: {
        '& .menu-bg': {
          background: 'linear-gradient(0deg, #FA4B49, #FA7B5E)',
        },
        '& .logo': {
          backgroundImage: `url(${logo})`,
        },
      },
    },

    // if RaMenuItemLink exist, then MuiMenuItem must have !!! hehe!
    MuiMenuItem: {
      root: {
        '&.sidebarMenuItem': {
          // for SubMenu
          height: '42px',
          marginBottom: '10px',
          borderRadius: '31px 0px 0px 31px',
          color: '#fff',
          fontSize: '18px',
        }
      },
    },

    RaMenuItemLink: {
      icon: {
        width: '32px',
        minWidth: 'auto',
      },

      root: {
        '&.sidebarMenuItem': {
          color: '#fff',
          position: 'relative',

          '&:hover': {
            background: '#F7F6F4',
            color: '#FF7D61',
            ...menuItemHovers,
          },
          '&:hover::before': {
            content: '""',
            background: '#F7F6F4',
            position: 'absolute',
            top: '-20px',
            right: '0',
          },
        }
      },
      active: {
        '&.sidebarMenuItem': {
          background: '#F7F6F4',
          color: '#FF7D61',
          ...menuItemHovers,

          '&::before': {
            content: '""',
            background: '#F7F6F4',
            position: 'absolute',
            top: '-20px',
            right: '0',
          },
        }
      },
    },

    MuiListItemIcon: {
      root: {
        minWidth: 'auto',

        '&.menu-item-icon': {
          backgroundSize: '100%',
        },

        '&.menu-item-compose': {
          width: '24px',
          height: '17px',
          backgroundImage: `url(${compose})`,
        },
        '& .menu-item-inbox': {
          width: '24px',
          height: '18px',
          backgroundImage: `url(${inbox})`,
        },
        '& .menu-item-junk': {
          width: '22px',
          height: '18px',
          backgroundImage: `url(${junk})`,
        },
        '& .menu-item-sent': {
          width: '19px',
          height: '19px',
          backgroundImage: `url(${sent})`,
        },
        '& .menu-item-subscription': {
          width: '18px',
          height: '16px',
          backgroundImage: `url(${subscription})`,
        },
        '& .menu-item-assets': {
          width: '18px',
          height: '20px',
          backgroundImage: `url(${assets})`,
        },
        '& .menu-item-trash': {
          width: '20px',
          height: '21px',
          backgroundImage: `url(${trash})`,
        },
        '& .menu-item-nfts': {
          width: '20px',
          height: '20px',
          backgroundImage: `url(${nft})`,
        },
        '& .menu-item-settings': {
          width: '20px',
          height: '20px',
          backgroundImage: `url(${settings})`,
        },
      },
    },

    RaUserMenu: {
      root: {
      },
      userButton: {
        fontSize: '18px',
      },
      avatar: {
        width: '42px',
        height: '42px',
        borderRadius: '5px',
        marginRight: '8px',
      },
    },

    MuiButton: {
      root: {
        '&.searchSubmit': {
          minWidth: 'auto',
          backgroundImage: `url(${search})`,
          padding: '0',
        }
      }
    },

    RaList: {
      bulkActionsDisplayed: {
        marginTop: '0',
        transition: 'none',
      },
    },

    RaBulkActionsToolbar: {
      toolbar: {
        position: 'relative',
        top: '10px',
        backgroundColor: 'transparent',
        height: 'auto!important',
        minHeight: 'auto!important',
        overflow: 'visible!important',
        color: '#FF7669',
        transition: 'none',
        justifyContent: 'end',
        padding: 0,
        marginBottom: '30px',
      },
      title: {
        color: '#FF7669',
        fontSize: '16px',

        '& button': {
          display: 'none',
        },

        '& h6': {
          fontWeight: 600,
        },
      },
      topToolbar: {
        marginLeft: '16px',
        padding: '0!important',
        minHeight: 'auto',

        // '& button': {
        //   height: '28px',
        //   lineHeight: '28px',
        //   padding: '0 10px',
        //   borderRadius: '5px',
        //   backgroundColor: '#FA6755',
        //   color: '#fff',
        //   transition: 'transform 0.3s ease',

        //   '&:hover': {
        //     transform: 'scale(1.1)',
        //     backgroundColor: '#FA6755',
        //   },
        // },
        // '& svg': {
        //   display: 'none',
        // },
        // '& span': {
        //   padding: 0,
        // },
      },
    },

    // MuiCard: {

    // },

    MuiCard: {
      root: {
        boxShadow: 'none',
        borderRadius: '24px',
        padding: '20px 34px 34px',
      },
    },

    MuiTabs: {
      indicator: {
        height: '4px',
        background: '#FF7D61',
      }
    },

    MuiTableRow: {
      root: {
        borderRadius: '10px',

        '&.MuiTableRow-hover:hover': {
          backgroundColor: '#FFD8D3',
        }
      }
    },

    RaDatagrid: {
      table: {
        '& td:first-child': {
          borderRadius: '10px 0 0 10px',
        },

        '& td:last-child': {
          borderRadius: '0 10px 10px 0',
        }
      },

      rowEven: {
        backgroundColor: '#FFF6F6',
      },
    },

    MuiTable: {
      root: {
      }
    },

    MuiTableCell: {
      root: {
        height: '45px',
        lineHeight: '45px',
        padding: '0 16px 0 14px',
        border: 'none!important',
        fontSize: '16px',
        color: '#083353',

        '&:first-child': {
          padding: '0 6px 0 28px',
        },

        '&:last-child': {
          padding: '0 28px 0 14px',
        },

        '& span': {
          fontSize: '18px',
          color: '#48687F',
        },

        '& .select-all svg, & .select-item svg': {
          width: '24px',
          height: '24px',
          color: '#E6E7EA',
        },

        '& .Mui-checked svg': {
          color: '#FA6755',

        }
      },

      head: {
        '& span': {
          color: '#083353',
        },

        '& .Mui-checked svg': {
          color: '#FA6755',

        }
      },

      paddingCheckbox: {
        width: '54px',
        padding: '0 8px',
      },

    },

    MuiTablePagination: {
      root: {
        '& .MuiTypography-root': {
          display: 'none',
        }
      }
    },

    MuiTableSortLabel: {
      root: {
        '& .MuiTableSortLabel-iconDirectionDesc, & .MuiTableSortLabel-iconDirectionAsc': {
          width: '21px',
          height: '11px',
          marginLeft: '12px',
          background: `url(${down3})`,
          backgroundSize: '100%',

          '& path': {
            display: 'none',
          }
        },
        '& .MuiTableSortLabel-iconDirectionAsc': {
          transform: 'rotate(180deg)',
        }
      },
    },

    RaPaginationActions: {
      actions: {
        marginTop: '52px',
        width: '100%',
        textAlign: 'center',

        '& .previous-page, & .next-page': {
          width: '77px',
          height: '36px',
          overflow: 'hidden',
          marginRight: '9px',
          background: `url(${prev}) no-repeat`,
          backgroundSize: '100%',

          '&:hover': {
            backgroundImage: `url(${prevHover})`,
          },

          '& svg': {
            display: 'none',
          },

          '& .MuiButton-label': {
            textIndent: '-999px',
          },
        },
        '& .next-page': {
          margin: '0 0 0 9px',
          transform: 'rotate(180deg)',
        },
      },

      button: {
        minWidth: 'auto',
        width: '36px',
        height: '36px',
        padding: '0',
        lineHeight: '36px',
        marginRight: '7px',
        borderRadius: '50%',
        border: '2px solid #E6E7EA',
        boxSizing: 'border-box',
        fontSize: '18px',
        fontFamily: 'PingFang SC',
        fontWeight: '600',
        color: '#999999',

        '&:hover': {
          ...RaPaginationBottonHover,
        },
      },

      currentPageButton: {
        ...RaPaginationBottonHover,
      },

      hellip: {
        width: '18px',
        height: '5px',
        padding: '0',
        margin: '0 10px 0 3px',
        background: `url(${circles}) no-repeat`,
        backgroundSize: '100%',
        display: 'inline-block',
        overflow: 'hidden',

        '&:after': {
          display: 'none',
        },
      },
    },

    // form
    RaFormInput: {
      input: {
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#F7F6F4',
          height: '48px',
          lineHeight: '48px',
          borderRadius: '0',
        },

        '& fieldset': {
          border: 'none',
        },

        '&.custom-input': {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          margin: '0 0 24px',
          position: 'relative',

          '& .MuiInputLabel-outlined': {
            width: '90px',
            marginRight: '10px',
            position: 'static',
            transform: 'none!important',
            fontWeight: 600,
            fontSize: '18px',
            color: '#666',

            '&.Mui-error': {
              color: '#f44336',
            },
          },

          '& .MuiOutlinedInput-root': {
            flex: 1,

            '&.Mui-error': {
              boxShadow: '0 0 3px 1px rgb(250, 101, 84, .9)',
            },
          },

          '& .MuiFormHelperText-contained': {
            top: '100%',
            left: 100,
            position: 'absolute',
            margin: 0,
            lineHeight: '20px',
          },

          '& .MuiSelect-iconOutlined': {
            width: '15px',
            height: '8px',
            right: 12,
            top: 20,
            background: `url(${down3})`,
            backgroundSize: '100%',

            '& path': {
              display: 'none',
            }
          },

          '& .MuiSelect-select': {
            padding: '0 14px',
          }
        }
      },
    },

    MuiFormControl: {
      root: {
        '&.ra-rich-text-input': {
          margin: '0 0 24px',
          paddingLeft: '100px',
          position: 'relative',
          boxSizing: 'border-box',

          '& .ql-toolbar.ql-snow': {
            margin: '10px 0 15px',
          },

          '& .MuiFormLabel-root': {
            width: '90px',
            marginRight: '10px',
            position: 'absolute',
            top: '52px',
            transform: 'none!important',
            fontWeight: 600,
            fontSize: '18px',
            color: '#666',
          },

          '& .ql-container': {
            border: 'none',
          },

          '& .ql-formats': {
            paddingRight: '12px',
            position: 'relative',

            '&:after': {
              content: '',
              position: 'absolute',
              width: 1.5,
              height: 15,
              top: 5,
              right: 0,
              backgroundColor: '#ccc',
            },

            '&:last-child:after': {
              display: 'none',
            },
          },

          '& .ql-icon-picker': {
            paddingLeft: '4px',
          },

          '& .ql-toolbar.ql-snow .ql-picker-label': {
            color: '#6E6E6E',

            '&:hover': {
              color: '#FA6554',
            },
          },

          '& .ql-toolbar.ql-snow .ql-picker-label.ql-active, & .ql-toolbar.ql-snow .ql-picker-item:hover, & .ql-toolbar.ql-snow .ql-picker-item.ql-selected, & .ql-snow.ql-toolbar button:hover': {
            color: '#FA6554',
          },

          '& .ql-toolbar.ql-snow button.ql-active .ql-fill, & .ql-toolbar.ql-snow button:hover .ql-fill': {
            fill: '#FA6554',
          },

          '& .ql-toolbar.ql-snow .ql-stroke, ': {
            stroke: '#6E6E6E',
          },

          '& .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, & .ql-toolbar.ql-snow .ql-picker-label:hover .ql-stroke, & .ql-toolbar.ql-snow button.ql-active .ql-stroke, & .ql-toolbar.ql-snow button:hover .ql-stroke, & .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke, & .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, & .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, & .ql-snow.ql-toolbar button:hover .ql-fill, & .ql-snow.ql-toolbar button.ql-active .ql-fill': {
            stroke: '#FA6554',
          },

          '& .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label': {
            border: 'none',
          },

          '& .ql-editor': {
            backgroundColor: '#F7F6F4!important',
            minHeight: '190px',
            padding: '20px 25px 25px',
            boxSizing: 'border-box',

            '& p': {
              marginBottom: '12px',
              lineHeight: '24px',
            },

            '&::before, &::after': {
              display: 'none',
            },
          }
        },
      },
    },

  },
  props: {
    // MuiButtonBase: {
    //   // disable ripple for perf reasons
    //   disableRipple: true,
    // },
  },
};

