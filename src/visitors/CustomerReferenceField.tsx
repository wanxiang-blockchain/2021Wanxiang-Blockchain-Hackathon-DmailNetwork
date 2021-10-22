import * as React from 'react';
import { FC } from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import FullNameField from './FullNameField';

const CustomerReferenceField: FC<
    Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
        source?: string;
    }
> = props => (
    <ReferenceField label="title" source="customer_id" reference="customers" {...props}>
        <FullNameField />
    </ReferenceField>
);

CustomerReferenceField.defaultProps = {
    source: 'customer_id',
    addLabel: true,
};

export default CustomerReferenceField;
