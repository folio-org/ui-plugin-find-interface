import React from 'react';
import { FormattedMessage } from 'react-intl';

const filterConfig = [
  {
    label: <FormattedMessage id="ui-plugin-find-interface.interface.type" />,
    name: 'type',
    cql: 'type',
    operator: '=',
    values: [
      {
        name: 'Admin',
        cql: 'Admin',
        displayName: <FormattedMessage id="ui-plugin-find-interface.interface.type.admin" />,
      },
      {
        name: 'End user',
        cql: 'End user',
        displayName: <FormattedMessage id="ui-plugin-find-interface.interface.type.endUser" />,
      },
      {
        name: 'Reports',
        cql: 'Reports',
        displayName: <FormattedMessage id="ui-plugin-find-interface.interface.type.reports" />,
      },
      {
        name: 'Orders',
        cql: 'Orders',
        displayName: <FormattedMessage id="ui-plugin-find-interface.interface.type.orders" />,
      },
      {
        name: 'Invoices',
        cql: 'Invoices',
        displayName: <FormattedMessage id="ui-plugin-find-interface.interface.type.invoices" />,
      },
      {
        name: 'Other',
        cql: 'Other',
        displayName: <FormattedMessage id="ui-plugin-find-interface.interface.type.other" />,
      },
    ],
  },
];

export default filterConfig;
