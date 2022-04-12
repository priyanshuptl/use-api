import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AxiosResponse } from 'axios';
import useApi from '../src';

const api = () =>
  new Promise(res => {
    res({
      data: 5,
    } as AxiosResponse<number>);
  }) as Promise<AxiosResponse<number>>;

const apiWithError = () =>
  new Promise((_, rej) => {
    rej('Error message');
  }) as Promise<AxiosResponse<number>>;

const TestComponent: React.FC<{
  api: () => Promise<AxiosResponse<number>>;
}> = ({ api }) => {
  const { response, loading, error } = useApi(api);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Some error occured</p>;
  }

  if (response) {
    return <p>{response}</p>;
  }

  return null;
};

describe('useApi hook', () => {
  it('Check Loading state', async () => {
    const div = document.createElement('div');

    ReactDOM.render(<TestComponent api={api} />, div);

    expect(div.textContent).toContain('Loading');

    ReactDOM.unmountComponentAtNode(div);
  });

  it('Check response', async () => {
    const div = document.createElement('div');

    ReactDOM.render(<TestComponent api={api} />, div);

    await new Promise(r => setTimeout(r, 500));
    expect(div.textContent).toBe('5');

    ReactDOM.unmountComponentAtNode(div);
  });

  it('Check Error state', async () => {
    const div = document.createElement('div');

    ReactDOM.render(<TestComponent api={apiWithError} />, div);

    await new Promise(r => setTimeout(r, 500));
    expect(div.textContent).toContain('error');

    ReactDOM.unmountComponentAtNode(div);
  });
});
