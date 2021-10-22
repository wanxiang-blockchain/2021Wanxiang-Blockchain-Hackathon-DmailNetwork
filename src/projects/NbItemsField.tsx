import * as React from 'react';
import { FunctionField, FieldProps } from 'react-admin';
import { Mail } from '../types';

const render = (record?: Mail) => record && record.basket.length;

const NbItemsField = ({ record }: FieldProps<Mail>) => (
    <FunctionField<Mail> record={record} render={render} />
);

NbItemsField.defaultProps = {
    label: 'resources.commands.fields.nb_items',
    textAlign: 'right',
};

export default NbItemsField;
