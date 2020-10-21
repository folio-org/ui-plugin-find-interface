import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import {
  PluginFindRecord,
  PluginFindRecordModal,
} from '@folio/stripes-acq-components';

import FindInterfacesContainer from './FindInterfacesContainer';

const PluginFindInterfaces = ({ addInterfaces, isMultiSelect, renderNewInterfaceBtn, ...rest }) => (
  <PluginFindRecord
    {...rest}
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
            checkboxAriaLabelKey="name"
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

PluginFindInterfaces.defaultProps = {
  disabled: false,
  searchLabel: <FormattedMessage id="ui-plugin-find-interface.button.addInterface" />,
  addInterfaces: noop,
  renderNewInterfaceBtn: noop,
  isMultiSelect: true,
};

export default PluginFindInterfaces;
