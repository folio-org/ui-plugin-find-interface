import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  get,
  noop,
  pickBy,
} from 'lodash';

import {
  SearchAndSort,
  makeQueryFunction,
} from '@folio/stripes/smart-components';
import {
  Modal,
  Button,
  Checkbox,
} from '@folio/stripes/components';

import packageInfo from '../package';

import { FILTERS } from './constants';
import FindInterfacesFilters from './FindInterfacesFilters';
import css from './FindInterfacesModal.css';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const filterConfig = [
  {
    name: FILTERS.TYPE,
    cql: FILTERS.TYPE,
    values: [],
  },
];

const visibleColumns = ['isChecked', 'name', 'uri', 'notes'];
const columnWidths = {
  isChecked: '8%',
  name: '20%',
  uri: '32%',
  notes: '40%',
};

const reduceInterfacesToMap = (interfaces, isChecked = false) => {
  return interfaces.reduce((acc, inface) => {
    acc[inface.id] = isChecked ? inface : null;

    return acc;
  }, {});
};

class FindInterfacesModal extends React.Component {
  static manifest = Object.freeze({
    query: {
      initialValue: {
        query: '',
        filters: '',
      },
    },
    records: {
      type: 'okapi',
      records: 'interfaces',
      // TODO: use constants from organizations
      path: 'organizations-storage/interfaces',
      clear: true,
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(name="*%{query.query}*" or uri="*%{query.query}*" or notes="*%{query.query}*")',
            {},
            filterConfig,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });

  state = {
    checkedInterfacesMap: {},
    isAllChecked: false,
  }

  closeModal = () => {
    this.props.onCloseModal();
  }

  getActiveFilters = () => {
    const { query } = this.props.resources;

    if (!query || !query.filters) return {};

    return query.filters
      .split(',')
      .reduce((filterMap, currentFilter) => {
        const [name, value] = currentFilter.split('.');

        if (!Array.isArray(filterMap[name])) {
          filterMap[name] = [];
        }

        filterMap[name].push(value);

        return filterMap;
      }, {});
  }

  handleFilterChange = ({ name, values }) => {
    const newFilters = {
      ...this.getActiveFilters(),
      [name]: values,
    };

    const filters = Object.keys(newFilters)
      .map((filterName) => {
        return newFilters[filterName]
          .map((filterValue) => `${filterName}.${filterValue}`)
          .join(',');
      })
      .filter(filter => filter)
      .join(',');

    this.props.mutator.query.update({ filters });
  }

  onSelectRow = (e, inface) => {
    const { id } = inface;

    this.setState(({ checkedInterfacesMap }) => ({
      checkedInterfacesMap: {
        ...checkedInterfacesMap,
        [id]: checkedInterfacesMap[id] ? null : inface,
      },
      isAllChecked: false,
    }));
  }

  save = () => {
    const interfaces = Object.values(pickBy(this.state.checkedInterfacesMap));

    this.props.addInterfaces(interfaces);
    this.closeModal();
  }

  selectAll = () => {
    this.setState((state, props) => {
      const isAllChecked = !state.isAllChecked;
      const interfaces = get(props.resources, 'records.records', []);
      const checkedInterfacesMap = reduceInterfacesToMap(interfaces, isAllChecked);

      return {
        checkedInterfacesMap,
        isAllChecked,
      };
    });
  }

  renderFilters = (onChange) => {
    return (
      <FindInterfacesFilters
        activeFilters={this.getActiveFilters()}
        onChange={onChange}
      />
    );
  }

  render() {
    const { resources, mutator, stripes, renderNewInterfaceBtn = noop } = this.props;
    const { checkedInterfacesMap, isAllChecked } = this.state;

    const checkedInterfacesListLength = Object.values(pickBy(checkedInterfacesMap)).length;
    const columnMapping = {
      isChecked: (
        <Checkbox
          checked={isAllChecked}
          onChange={this.selectAll}
          data-test-find-interfaces-modal-select-all
          type="checkbox"
        />
      ),
      name: <FormattedMessage id="ui-plugin-find-interface.interface.name" />,
      uri: <FormattedMessage id="ui-plugin-find-interface.interface.url" />,
      notes: <FormattedMessage id="ui-plugin-find-interface.interface.notes" />,
    };

    const resultsFormatter = {
      isChecked: data => (
        <Checkbox
          type="checkbox"
          checked={Boolean(checkedInterfacesMap[data.id])}
        />
      ),
    };

    const footer = (
      <div className={css.findInterfaceModalFooter}>
        <Button
          marginBottom0
          onClick={this.closeModal}
          className="left"
        >
          <FormattedMessage id="ui-plugin-find-interface.button.close" />
        </Button>
        <div>
          <FormattedMessage
            id="ui-plugin-find-interface.modal.totalSelected"
            values={{ count: checkedInterfacesListLength }}
          />
        </div>
        <Button
          marginBottom0
          data-test-find-interfaces-modal-save
          onClick={this.save}
          disabled={!checkedInterfacesListLength}
          buttonStyle="primary"
        >
          <FormattedMessage id="ui-plugin-find-interface.button.save" />
        </Button>
      </div>
    );

    return (
      <Modal
        data-test-find-interfaces-modal
        dismissible
        enforceFocus={false}
        footer={footer}
        label={<FormattedMessage id="ui-plugin-find-interface.modal.title" />}
        onClose={this.closeModal}
        open
        contentClass={css.findInterfaceModalContent}
        style={{ minHeight: '500px' }}
        size="large"
      >
        <React.Fragment>
          <div className={css.findInterfaceModalNewBtnWrapper}>
            {renderNewInterfaceBtn()}
          </div>
          <SearchAndSort
            packageInfo={this.props.packageInfo || packageInfo}
            objectName="interface"
            visibleColumns={visibleColumns}
            columnMapping={columnMapping}
            columnWidths={columnWidths}
            resultsFormatter={resultsFormatter}
            initialResultCount={INITIAL_RESULT_COUNT}
            resultCountIncrement={RESULT_COUNT_INCREMENT}
            parentResources={resources}
            parentMutator={mutator}
            onFilterChange={this.handleFilterChange}
            renderFilters={this.renderFilters}
            stripes={stripes}
            viewRecordComponent={noop}
            disableRecordCreation
            browseOnly
            showSingleResult
            onSelectRow={this.onSelectRow}
            viewRecordPerms=""
          />
        </React.Fragment>
      </Modal>
    );
  }
}

FindInterfacesModal.propTypes = {
  packageInfo: PropTypes.object,
  stripes: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  addInterfaces: PropTypes.func.isRequired,
  renderNewInterfaceBtn: PropTypes.func,
};

export default FindInterfacesModal;
