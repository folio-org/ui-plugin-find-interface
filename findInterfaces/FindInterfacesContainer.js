import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { FormattedMessage } from 'react-intl';
// import { noop } from 'lodash';

import { Button } from '@folio/stripes/components';

import css from './FindInterfacesContainer.css';

class FindInterfacesContainer extends React.Component {
  getStyle() {
    const { marginTop0 } = this.props;

    return className(
      css.searchControl,
      { [css.marginTop0]: marginTop0 },
    );
  }

  render() {
    const { disabled, searchButtonStyle, searchLabel, marginBottom0 } = this.props;

    return (
      <div className={this.getStyle()}>
        <Button
          buttonStyle={searchButtonStyle}
          disabled={disabled}
          key="searchButton"
          marginBottom0={marginBottom0}
          tabIndex="-1"
        >
          {searchLabel}
        </Button>
      </div>
    );
  }
}

FindInterfacesContainer.propTypes = {
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  // stripes: PropTypes.object,
  // dataKey: PropTypes.string.isRequired,
  // addInterfaces: PropTypes.func,
};

FindInterfacesContainer.defaultProps = {
  disabled: false,
  marginBottom0: true,
  marginTop0: true,
  searchButtonStyle: 'primary',
  searchLabel: <FormattedMessage id="ui-plugin-find-interface.button.addInterface" />,
  // addInterfaces: noop,
};

export default FindInterfacesContainer;
