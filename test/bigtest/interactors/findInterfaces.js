import {
  interactor,
  scoped,
  collection,
  clickable,
  is,
} from '@bigtest/interactor';

@interactor class PluginModalInteractor {
  static defaultScope = '[data-test-find-interfaces-modal]';

  instances = collection('[role=row] a', {
    click: clickable(),
  });
}

@interactor class FindContactInteractor {
  button = scoped('[data-test-plugin-find-interfaces-button]', {
    click: clickable(),
    isFocused: is(':focus'),
  });

  modal = new PluginModalInteractor();
}

export default FindContactInteractor;
