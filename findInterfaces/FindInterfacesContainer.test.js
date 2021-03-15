import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import FindInterfacesContainer from './FindInterfacesContainer';

const mockFetchMore = jest.fn();
const mockUpdateFn = jest.fn();

jest.mock('@folio/stripes-smart-components/lib/SearchAndSort/ConnectedSource/StripesConnectedSource', () => {
  return jest.fn().mockImplementation(() => {
    return { fetchMore: mockFetchMore, update: mockUpdateFn };
  });
});

// eslint-disable-next-line react/prop-types
const children = jest.fn(({ onNeedMoreData, querySetter }) => (
  <>
    <button
      type="button"
      onClick={onNeedMoreData}
    >
      OnNeedMoreData
    </button>
    <button
      type="button"
      onClick={() => querySetter({ state: {} })}
    >
      UpdateQuery
    </button>
  </>
));

const findInterfacesContainer = (mutator) => (
  <FindInterfacesContainer
    mutator={mutator}
  >
    {children}
  </FindInterfacesContainer>
);

describe('FindInterfacesContainer component', () => {
  let mutator;

  beforeEach(() => {
    mutator = {
      records: {
        GET: jest.fn(),
      },
      query: {
        update: jest.fn(),
        replace: jest.fn(),
      },
    };
  });

  it('should not fetch interfaces when plugin is open by default', async () => {
    await act(async () => {
      render(findInterfacesContainer(mutator));
    });

    expect(mutator.query.replace).toHaveBeenCalled();
    expect(mutator.records.GET).not.toHaveBeenCalled();
  });

  it('should fetch more data', async () => {
    render(findInterfacesContainer(mutator));

    await waitFor(() => {
      user.click(screen.getByText('OnNeedMoreData'));
    });

    expect(mockFetchMore).toHaveBeenCalledTimes(1);
  });

  it('should update data', async () => {
    render(findInterfacesContainer(mutator));

    await waitFor(() => {
      user.click(screen.getByText('UpdateQuery'));
    });

    expect(mutator.query.update).toHaveBeenCalled();
  });

  it('should update source', async () => {
    const { rerender } = render(findInterfacesContainer(mutator));

    rerender(findInterfacesContainer(mutator));

    expect(mockUpdateFn).toHaveBeenCalledTimes(2);
  });
});
