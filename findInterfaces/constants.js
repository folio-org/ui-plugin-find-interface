import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FILTERS = {
  TYPE: 'type',
};

export const TYPES = [
  {
    value: 'Admin',
    label: <FormattedMessage id="ui-plugin-find-interface.interface.type.admin" />,
  },
  {
    value: 'End user',
    label: <FormattedMessage id="ui-plugin-find-interface.interface.type.endUser" />,
  },
  {
    value: 'Reports',
    label: <FormattedMessage id="ui-plugin-find-interface.interface.type.reports" />,
  },
  {
    value: 'Orders',
    label: <FormattedMessage id="ui-plugin-find-interface.interface.type.orders" />,
  },
  {
    value: 'Invoices',
    label: <FormattedMessage id="ui-plugin-find-interface.interface.type.invoices" />,
  },
  {
    value: 'Other',
    label: <FormattedMessage id="ui-plugin-find-interface.interface.type.other" />,
  },
];
