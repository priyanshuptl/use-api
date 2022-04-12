import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

function useApi<T = any, P extends any[] = []>(
  api: (...props: P) => Promise<AxiosResponse<T>>,
  ...props: P
) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refetchProp, setRefetchProp] = useState(true);

  // use stringified props object so that API is not called for simlar value (shallow comparison is not sufficient here).
  const stringifiedProps = JSON.stringify(props);

  useEffect(() => {
    setLoading(true);
    api(...JSON.parse(stringifiedProps))
      ?.then(({ data }) => {
        setResponse(data);
        setError(null);
      })
      ?.catch(err => {
        console.error(api.name, ':', err);
        setError(err);
      })
      ?.finally(() => {
        setLoading(false);
      });
  }, [api, stringifiedProps, refetchProp]);

  const refetch = () => {
    setRefetchProp(prev => !prev);
  };

  // Todo: Pass function to refetch from API.
  return { response, error, loading, refetch };
}

export default useApi;
