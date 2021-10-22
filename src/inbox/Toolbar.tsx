import * as React from 'react';
import {
  Children,
  Fragment,
  isValidElement,
  ReactElement,
  FC,
  ReactNode,
} from 'react';
import { ToolbarProps, SaveButton, useNotify } from 'react-admin';
import PropTypes from 'prop-types';
import MuiToolbar, {
  ToolbarProps as MuiToolbarProps,
} from '@material-ui/core/Toolbar';
import withWidth from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Record, RedirectionSideEffect, MutationMode } from 'ra-core';
import { FormRenderProps } from 'react-final-form';

// import { SaveButton, DeleteButton } from '../button';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Storage, Create_Mail_Cached } from '../utils/storage'

const useStyles = makeStyles(
  theme => ({
    toolbar: {
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
    },
    desktopToolbar: {
      marginTop: theme.spacing(2),
    },
    mobileToolbar: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      width: '100%',
      boxSizing: 'border-box',
      flexShrink: 0,
      zIndex: 2,
    },
    defaultToolbar: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
    },
    spacer: {
      [theme.breakpoints.down('xs')]: {
        height: '5em',
      },
    },
    button: {
      height: '38px',
      lineHeight: '38px',
      padding: '0 15px',
      borderRadius: '10px',
      fontSize: '16px',
      color: '#fff',
      transition: 'transform 0.3s ease',
      textTransform: 'none',
      marginLeft: '35px',

      '&.Mui-disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        color: '#fff',
      },

      '&:not(.Mui-disabled)': {
        backgroundColor: '#FA6755',

        '&:hover': {
          transform: 'scale(1.1)',
          backgroundColor: '#FA6755',
        },
      }
    },
  }),
  { name: 'RaToolbar' }
);


const valueOrDefault = (value, defaultValue) =>
  typeof value === 'undefined' ? defaultValue : value;

/**
 * The Toolbar displayed at the bottom of forms.
 *
 * @example Always enable the <SaveButton />
 *
 * import * as React from 'react';
 * import {
 *     Create,
 *     DateInput,
 *     TextInput,
 *     SimpleForm,
 *     Toolbar,
 *     required,
 * } from 'react-admin';
 *
 * const now = new Date();
 * const defaultSort = { field: 'title', order: 'ASC' };
 *
 * const CommentCreate = props => (
 *     <Create {...props}>
 *         <SimpleForm redirect={false} toolbar={<Toolbar alwaysEnableSaveButton={true} />}>
 *             <TextInput
 *                 source="author.name"
 *                 fullWidth
 *             />
 *             <DateInput source="created_at" defaultValue={now} />
 *             <TextInput source="body" fullWidth={true} multiline={true} />
 *         </SimpleForm>
 *     </Create>
 * );
 *
 * @typedef {Object} Props the props you can use (other props are injected by the <SimpleForm>)
 * @prop {boolean} alwaysEnableSaveButton Force enabling the <SaveButton>. If it's not defined, the <SaveButton> will be enabled using the `pristine` and `validating` props (disabled if pristine or validating, enabled otherwise).
 * @prop {ReactElement[]} children Customize the buttons you want to display in the <Toolbar>.
 * @prop {string} width Apply to the mobile or desktop classes depending on its value. Pass `xs` to display the mobile version.
 *
 */
// copy from react-admin/Toolbar: /node_modules/ra-ui-materialui/src/form/Toolbar.tsx

const Toolbar: FC<ToolbarProps> = props => {
  const {
    alwaysEnableSaveButton,
    basePath,
    children,
    className,
    classes: classesOverride,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable,
    mutationMode,
    validating,
    width,
    ...rest
  } = props;
  const classes = useStyles(props);

  // Use form pristine and validating to enable or disable the save button
  // if alwaysEnableSaveButton is undefined
  const disabled = !valueOrDefault(
    alwaysEnableSaveButton,
    !pristine && !validating
  );

  const notify = useNotify();
  const onSave = () => {
    notify(`resources.reviews.notification.saved_success`, 'success');

    return Promise.resolve();
  }

  const onSubmit = async (...args) => {
    if (handleSubmit) {
      await handleSubmit(...args);
      // @TODO: if created success then remove
      Storage.remove(Create_Mail_Cached);
    }
  }

  return (
    <Fragment>
      <MuiToolbar
        className={classnames(
          classes.toolbar,
          {
            [classes.mobileToolbar]: width === 'xs',
            [classes.desktopToolbar]: width !== 'xs',
          },
          className
        )}
        role="toolbar"
        {...rest}
      >
        {Children.count(children) === 0 ? (
          <div className={classes.defaultToolbar}>
            {/* <SaveButton 
              label="Save"
              icon={<></>}
              handleSubmitWithRedirect={
                onSave
              }
              className={classes.button}
              disabled={disabled}
              invalid={invalid}
              // redirect={redirect}
              saving={validating}
              submitOnEnter={false}
            />
            */}
            <SaveButton
              label="Send"
              icon={<></>}
              handleSubmitWithRedirect={
                onSubmit
              }
              className={classes.button}
              disabled={disabled}
              invalid={invalid}
              redirect={redirect}
              saving={saving || validating}
              submitOnEnter={true}
            />
          </div>
        ) : (
          Children.map(children as any, (button: ReactElement) =>
            button && isValidElement<any>(button)
              ? React.cloneElement(button, {
                basePath: valueOrDefault(
                  button.props.basePath,
                  basePath
                ),
                handleSubmit: valueOrDefault(
                  button.props.handleSubmit,
                  handleSubmit
                ),
                handleSubmitWithRedirect: valueOrDefault(
                  button.props.handleSubmitWithRedirect,
                  handleSubmitWithRedirect
                ),
                onSave: button.props.onSave,
                invalid,
                pristine,
                record: valueOrDefault(
                  button.props.record,
                  record
                ),
                resource: valueOrDefault(
                  button.props.resource,
                  resource
                ),
                saving,
                submitOnEnter: valueOrDefault(
                  button.props.submitOnEnter,
                  submitOnEnter
                ),
                undoable: valueOrDefault(
                  button.props.undoable,
                  undoable
                ),
              })
              : null
          )
        )}
      </MuiToolbar>
      <div className={classes.spacer} />
    </Fragment>
  );
};

Toolbar.propTypes = {
  basePath: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleSubmitWithRedirect: PropTypes.func,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  record: PropTypes.any,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  resource: PropTypes.string,
  saving: PropTypes.bool,
  submitOnEnter: PropTypes.bool,
  undoable: PropTypes.bool,
  validating: PropTypes.bool,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

Toolbar.defaultProps = {
  submitOnEnter: true,
};

export default withWidth({ initialWidth: 'xs' })(Toolbar);
