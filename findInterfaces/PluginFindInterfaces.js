import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import {
  PluginFindRecord,
  PluginFindRecordModal,
} from '@folio/stripes-acq-components';

import FindInterfacesContainer from './FindInterfacesContainer';

const defaultSearchLabel = <FormattedMessage id="ui-plugin-find-interface.button.addInterface" />;

const PluginFindInterfaces = ({
  addInterfaces = noop,
  isMultiSelect = true,
  renderNewInterfaceBtn = noop,
  disabled = false,
  searchLabel = defaultSearchLabel,
  ...rest
}) => (
  <PluginFindRecord
    {...rest}
    disabled={disabled}
    searchLabel={searchLabel}
    selectRecordsCb={addInterfaces}
  >
    {(modalProps) => (
      <FindInterfacesContainer>
        {(viewProps) => (
          <PluginFindRecordModal
            {...viewProps}
            {...modalProps}
            isMultiSelect={isMultiSelect}
            renderNewBtn={renderNewInterfaceBtn}
            getRecordLabel={({ name }) => name}
          />
        )}
      </FindInterfacesContainer>
    )}
  </PluginFindRecord>
);

PluginFindInterfaces.propTypes = {
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  addInterfaces: PropTypes.func,
  renderNewInterfaceBtn: PropTypes.func,
  isMultiSelect: PropTypes.bool,
};

export default PluginFindInterfaces;
