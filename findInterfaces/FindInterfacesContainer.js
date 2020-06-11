import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  makeQueryFunction,
  StripesConnectedSource,
} from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import filterConfig from './filterConfig';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const columnWidths = {
  isChecked: '8%',
  name: '20%',
  uri: '32%',
  notes: '40%',
};
const visibleColumns = ['name', 'uri', 'notes'];
const columnMapping = {
  name: <FormattedMessage id="ui-plugin-find-interface.interface.name" />,
  uri: <FormattedMessage id="ui-plugin-find-interface.interface.url" />,
  notes: <FormattedMessage id="ui-plugin-find-interface.interface.notes" />,
};
const idPrefix = 'uiPluginFindInterfaces-';
const modalLabel = <FormattedMessage id="ui-plugin-find-interface.modal.title" />;

class FindInterfacesContainer extends React.Component {
  static manifest = Object.freeze({
    query: {
      initialValue: {
        query: '',
        filters: '',
      },
    },
    records: {
      throwErrors: false,
      type: 'okapi',
      records: 'interfaces',
      path: 'organizations-storage/interfaces',
      clear: true,
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(name="%{query.query}*" or uri="%{query.query}*" or notes="%{query.query}*")',
            {},
            filterConfig,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });

  constructor(props, context) {
    super(props, context);

    this.logger = props.stripes.logger;
    this.log = this.logger.log.bind(this.logger);
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger);
    this.props.mutator.query.replace({ sort: 'name' });
  }

  componentDidUpdate() {
    this.source.update(this.props);
  }

  onNeedMoreData = () => {
    if (this.source) {
      this.source.fetchMore(RESULT_COUNT_INCREMENT);
    }
  };

  querySetter = ({ nsValues, state }) => {
    if (/reset/.test(state.changeType)) {
      this.props.mutator.query.replace(nsValues);
    } else {
      this.props.mutator.query.update(nsValues);
    }
  }

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  }

  render() {
    const {
      resources,
      children,
    } = this.props;

    if (this.source) {
      this.source.update(this.props);
    }

    return children({
      initialSearch: '?sort=name',
      onNeedMoreData: this.onNeedMoreData,
      queryGetter: this.queryGetter,
      querySetter: this.querySetter,
      source: this.source,
      columnMapping,
      columnWidths,
      filterConfig,
      idPrefix,
      modalLabel,
      visibleColumns,
      data: {
        records: get(resources, 'records.records', []),
      },
    });
  }
}

FindInterfacesContainer.propTypes = {
  stripes: PropTypes.object.isRequired,
  children: PropTypes.func,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
};

export default stripesConnect(FindInterfacesContainer, { dataKey: 'find_interface' });
