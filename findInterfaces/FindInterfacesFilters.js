import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
  Selection,
} from '@folio/stripes/components';

import { FILTERS, TYPES } from './constants';

class FindInterfacesFilters extends Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  };

  createClearFilterHandler = (name) => () => {
    this.props.onChange({ name, values: [] });
  }

  onChangeTypeFilter = type => this.props.onChange({ name: FILTERS.TYPE, values: [type] });

  renderTypeFilter = () => {
    const dataOptions = TYPES;

    const activeFilters = this.props.activeFilters.type || [];

    return (
      <Accordion
        displayClearButton={activeFilters.length > 0}
        header={FilterAccordionHeader}
        label={<FormattedMessage id="ui-plugin-find-interface.interface.type" />}
        onClearFilter={this.createClearFilterHandler(FILTERS.TYPE)}
      >
        <Selection
          dataOptions={dataOptions}
          value={activeFilters[0] || ''}
          onChange={this.onChangeTypeFilter}
        />
      </Accordion>
    );
  }

  render() {
    return (
      <AccordionSet>
        {this.renderTypeFilter()}
      </AccordionSet>
    );
  }
}

export default FindInterfacesFilters;
