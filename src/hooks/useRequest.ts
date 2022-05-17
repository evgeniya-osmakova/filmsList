import { useState, useEffect, useRef, useCallback } from 'react';

function useRequest<T>(request: () => Promise<T> ) {
  const [state, setState] = useState<{loading: boolean, error: null | string, data: null | T}>({
    loading: false,
    error: null,
    data: null,
  });

  const calledOnce = useRef(false);

  const loadData = useCallback(async () => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await request();
      setState({ loading: false, error: null, data });
    } catch (error: any) {
      setState({ loading: false, error, data: null });
    }
  }, [request]);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    calledOnce.current = true;

    const loadData = async () => {
      setState({ loading: true, error: null, data: null });
      try {
        const data = await request();
        setState({ loading: false, error: null, data });
      } catch (error: any) {
        setState({ loading: false, error, data: null });
      }
    }

    loadData();
  }, [loadData, request]);


  return {...state};
}

export default useRequest;
