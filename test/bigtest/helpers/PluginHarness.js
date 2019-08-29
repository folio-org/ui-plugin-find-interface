import React from 'react';
import noop from 'lodash/noop';

import { Pluggable } from '@folio/stripes/core';

const PluginHarness = (props) => (
  <Pluggable
    aria-haspopup="true"
    type="find-interface"
    id="clickable-find-interfaces"
    searchLabel="Look up interfaces"
    marginTop0
    searchButtonStyle="link"
    addInterfaces={noop}
    {...props}
  >
    <span data-test-no-plugin-available>No plugin available!</span>
  </Pluggable>
);

export default PluginHarness;
