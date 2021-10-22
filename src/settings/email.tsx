import React, { FC, Fragment, useCallback, useEffect, useState, cloneElement, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';
// import {
//   CreateContextProvider,
//   useRecordContext,
//   ResourceContextProvider,
//   useCheckMinimumRequiredProps,
//   useCreateController,
// } from 'ra-core';
import {
  Toolbar,
  useNotify,
  CreateProps,
  SaveButton,
  SimpleForm,
  useDataProvider,
  ImageField,
  useSaveContext,
  useFormContext,
} from 'react-admin';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';

import { makeStyles } from '@material-ui/core/styles';
import ava from '../assets/red/ava.png';
import photo from '../assets/red/photo.png';
import image from '../assets/red/image.png';
import ok from '../assets/red/ok.png';
import error from '../assets/red/error.png';

import { Storage, Username, Email_Name, Identity_Key } from '../utils/storage'
import { fetch, emailHost } from '../utils'

const useStyles = makeStyles(
  theme => ({
    root: {

    },
    chunk: {
      marginTop: '10px',
      marginBottom: '80px',
      display: 'flex',
      width: '100%',
    },
    label: {
      width: '240px',
      paddingRight: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#083353',
      textAlign: 'right',
    },
    form: {
      flex: 1,

      '&.error .errorTip': {
        display: 'flex',
      },

      '&.error .drop': {
        borderColor: '#FA6755',
      },

      '&.error .email': {
        borderColor: '#FA6755',
      },

      '&.error .valid': {
        color: '#FA6755',

        '& i': {
          backgroundImage: `url(${error})`,
        },
      },

      '& .drop': {
        width: '400px',
        height: '120px',
        padding: '26px 30px',
        marginTop: '20px',
        border: '2px dashed #BFBFBF',
        backgroundColor: '#F2F2F2',
        borderRadius: '10px',
        textAlign: 'center',
        boxSizing: 'border-box',
        color: '#56677B',
        cursor: 'pointer',

        '& input': {
          display: 'block!important',
          width: '30px',
          height: '28px',
          background: `url(${image}) no-repeat`,
          backgroundSize: '100%',
          lineHeight: '300px',
          overflow: 'hidden',
          margin: '0 auto 16px',
          cursor: 'pointer',
        },
      },

      '& .email': {
        position: 'relative',
        width: '400px',
        height: '32px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        lineHeight: '30px',

        '& input': {
          flex: 1,
          border: 'none',
          lineHeight: '30px',
          padding: '0 12px',
          outline: 'none',
          fontSize: '14px',
        },

        '& > span': {
          width: '150px',
          background: '#EBEBEB',
          textAlign: 'center',
        },

        '& .valid': {
          position: 'absolute',
          left: '100%',
          top: '4px',
          marginLeft: '15px',
          width: '300px',
          display: 'flex',
          alignItems: 'start',
          color: '#333',
          lineHeight: '20px',
          fontSize: '14px',

          '& i': {
            width: '16px',
            height: '16px',
            background: `url(${ok}) no-repeat`,
            backgroundSize: '100%',
            marginRight: '10px',
            display: 'block',
            position: 'relative',
            top: '3px',
          },
          '& span': {
            flex: 1,
          }
        }
      },
    },
    avaChunk: {
      display: 'flex',
      alignItems: 'baseline',
      height: '65px',

      '& .errorTip': {
        marginLeft: '25px',
        whiteSpace: 'nowrap',
        display: 'none',
        position: 'relative',
        top: '-5px',

        '& span': {
          flex: 1,
          color: '#FA6755',
          fontSize: '14px',
        },

        '&::before': {
          content: '""',
          width: '16px',
          height: '16px',
          background: `url(${error}) no-repeat`,
          backgroundSize: '100%',
          marginRight: '8px',
        },
      },
    },
    ava: {
      position: 'relative',
      width: '65px',
      height: '100%',
      cursor: 'pointer',

      '& img': {
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '15px',
      },

      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'none',
      },
      '&:hover::before, &:hover::after': {
        display: 'block',
      },
      '&::before': {
        borderRadius: '0 0 15px 15px',
        height: '20px',
        backgroundColor: 'rgba(0, 0, 0, .55)',
      },
      '&::after': {
        width: '15px',
        height: '15px',
        background: `url(${photo}) no-repeat`,
        backgroundSize: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '1px',
      },
    },

    submit: {
      '& a': {
        display: 'inline-block',
        color: '#fff',
        height: '38px',
        padding: '0 15px',
        fontSize: '16px',
        transition: 'transform 0.3s ease',
        lineHeight: '38px',
        borderRadius: '10px',
        textTransform: 'none',
        backgroundColor: '#FA6755',
        cursor: 'pointer',

        '&:hover': {
          transform: 'scale(1.05)'
        }
      },

      '& .disabled': {
        backgroundColor: '#ddd',
        cursor: 'default',

        '&:hover': {
          transform: 'none',
        }
      }
    }
  }));

// const EmailToolbar = props => (
//   <Toolbar {...props}>
//     <SaveButton
//       label="post.action.save_and_notify"
//       transform={data => {
//         console.log('transfrom data', data)
//         return { ...data }
//       }}
//       submitOnEnter={false}
//     />
//   </Toolbar>
// );

// control the ava is necessarily or not
const avaMustHave = false;

interface Props { }
// TODO: progress bar
const Email: FC<CreateProps> = props => {
  const classes = useStyles();
  const notify = useNotify();
  const requestEmail = useSelector((state: AppState) => state.email);
  const identity = Storage.get(Identity_Key);

  // const data = useDataProvider();
  // console.log('useDataProvider', data.aaa());

  const uploadRef = useRef<HTMLDivElement | null>(null);
  // const context = useSaveContext({});
  // const record = useRecordContext();
  // const formContext = useFormContext();
  // useEffect(() => {
  //   console.log('record', record)
  // }, [record])

  // const controllerProps = useCreateController({
  //   basePath: '',
  //   resource: 'settings',
  //   ...props,
  // });

  const [files, setFiles] = useState<any[]>([]);
  // https://react-dropzone.js.org/#section-previews
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles((acceptedFiles as any).map((file: any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  const onAvaClick = () => {
    uploadRef?.current?.click();
  }

  const [email, setEmail] = useState<string>("");
  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.length) {
      setEmailError(true);
    }
  }

  const [avaError, setAvaError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const onSubmit = async () => {
    let hasError = false;
    if (avaMustHave && !files.length) {
      setAvaError(true);
      hasError = true;
    }
    if (!email.length) {
      setEmailError(true);
      hasError = true;
    }
    if (hasError) {
      return;
    }

    try {
      const { data: { success, msg, code } } = await fetch('settings', 'create', {
        emailname: `${email}${emailHost}`,
        identity,
      })

      if (success) {
        Storage.set(Username, email);
        Storage.set(Email_Name, `${email}${emailHost}`);
        notify(`resources.reviews.notification.submit_success`, 'success', {
          // not effective 
          message: msg
        });
        setTimeout(() => {
          window.location.reload()
        }, 300);
      } else {
        notify(`resources.reviews.notification.submit_failed`, 'error', {
          message: msg
        });
      }
    } catch (error) {
      notify(`resources.reviews.notification.submit_failed`, 'error');
      console.log('error', error);
    }
  }

  useEffect(() => {
    if (avaMustHave && files.length) {
      setAvaError(false);
    }
  }, [files])

  useEffect(() => {
    if (email.length) {
      setEmailError(false);
    }
  }, [email])

  useEffect(() => {
    if (requestEmail) {
      setEmail(requestEmail.replace('@ic.dmail.ai', ''));
    }
  }, [requestEmail])

  return (
    <div className={classes.root}>
      {/* <CreateContextProvider value={controllerProps}> */}
      <SimpleForm variant="outlined" toolbar={<></>}>
        <div className={classes.chunk} style={{ marginBottom: 20 }}>
          <div className={classes.label}>Identity :</div>
          <div>{identity || '--'}</div>
        </div>
        <div className={classes.chunk}>
          <div className={classes.label}>Modify Avatar :</div>
          <div className={clsx(classes.form, avaError ? 'error' : '')}>
            <div className={classes.avaChunk}>
              <div className={classes.ava} onClick={onAvaClick}>
                <img src={files.length ? files[0]['preview'] : ava} />
              </div>
              <div className="errorTip"><span>Please upload a photo as avatar!</span></div>
            </div>
            {/* <ImageInput source="pictures" label="Related pictures" accept="image/*" ref={uploadRef}>
              <ImageField source="src" title="title" />
            </ImageInput> */}
            <div {...getRootProps({ className: 'drop' })} ref={(e) => {
              uploadRef.current = e;
            }}>
              <input {...getInputProps()} />
              <p>Click or dray the file here to upload</p>
            </div>
          </div>
        </div>
        <div className={classes.chunk}>
          <div className={classes.label}>Mailbox alias settings:</div>
          <div className={clsx(classes.form, emailError ? 'error' : '')}>
            <div className="email">
              <input value={email} onInput={onEmailChange} placeholder="enter here..." />
              <span>@ic.dmail.ai</span>
              <div className="valid">
                <i></i>
                {emailError ? (
                  <span>(Please input the email!)</span>
                ) : (
                  <span>(You need to verify the uniqueness of the alias. If it is repeated,you will be prompted.)</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.chunk} style={{ marginBottom: 0 }}>
          <div className={classes.label}></div>
          <div className={classes.form}>
            <div className={classes.submit}>
              <a className={(avaMustHave && !files.length) || !email.length ? 'disabled' : ''} onClick={onSubmit}>submit</a>
            </div>
          </div>
        </div>
      </SimpleForm>
      {/* </CreateContextProvider> */}
    </div>
  )
};

export default Email;