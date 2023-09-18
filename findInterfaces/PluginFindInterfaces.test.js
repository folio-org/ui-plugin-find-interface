import { render } from '@folio/jest-config-stripes/testing-library/react';

import PluginFindInterfaces from './PluginFindInterfaces';

const renderPluginFindInterfaces = () => (render(
  <PluginFindInterfaces />,
));

describe('renderPluginFindInterfaces component', () => {
  it('should render find-interfaces plugin', async () => {
    const { getByText } = renderPluginFindInterfaces();

    expect(getByText('ui-plugin-find-interface.button.addInterface')).toBeDefined();
  });
});
