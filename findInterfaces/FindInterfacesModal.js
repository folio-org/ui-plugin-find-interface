import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import { SearchAndSort } from '@folio/stripes/smart-components';
import {
  Modal,
  Button,
} from '@folio/stripes/components';

import packageInfo from '../package';

import css from './FindInterfacesModal.css';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const visibleColumns = ['name', 'uri', 'notes'];
const columnMapping = {
  name: <FormattedMessage id="ui-plugin-find-interface.interface.name" />,
  uri: <FormattedMessage id="ui-plugin-find-interface.interface.url" />,
  notes: <FormattedMessage id="ui-plugin-find-interface.interface.notes" />,
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
      path: 'organizations-storage/interfaces',
      clear: true,
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });

  closeModal = () => {
    this.props.onCloseModal();
  }

  onSelectRow = (e, inface) => {
    this.props.addInterfaces([inface]);
    this.closeModal();
  }

  render() {
    const { resources, mutator, stripes } = this.props;

    const footer = (
      <Fragment>
        <Button
          marginBottom0
          onClick={this.closeModal}
        >
          <FormattedMessage id="ui-plugin-find-interface.button.close" />
        </Button>
      </Fragment>
    );

    return (
      <Modal
        data-test-find-interface-modal
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
        <SearchAndSort
          packageInfo={this.props.packageInfo || packageInfo}
          objectName="interface"
          visibleColumns={visibleColumns}
          columnMapping={columnMapping}
          resultsFormatter={{}}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          parentResources={resources}
          parentMutator={mutator}
          filterConfig={[]}
          stripes={stripes}
          viewRecordComponent={noop}
          disableRecordCreation
          browseOnly
          showSingleResult
          onSelectRow={this.onSelectRow}
          viewRecordPerms=""
        />
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
};

export default FindInterfacesModal;
