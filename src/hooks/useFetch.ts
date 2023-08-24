import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface FetchResult<T> {
  data: T[];
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

const useFetch = <T>(): FetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const options = {
    method: "GET",
    url: import.meta.env.VITE_API + "/check",
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.request(options);
      setData(response.data);

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
