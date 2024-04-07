import { useCallback, useEffect, useState } from "react";
import { httpRequestFetch } from "../utils/http";
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  function clearData() {
    setData(initialData);
  }
  const sendRequest = useCallback(
    async (data1) => {
      setIsLoading(true);
      try {
        const data = await httpRequestFetch(url, {
          ...config,
          body: data1,
        });
        setData(data);
      } catch (e) {
        setError(e.message || "Something went wrong");
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if (config && (config.method === "GET" || !config.method)) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
}
