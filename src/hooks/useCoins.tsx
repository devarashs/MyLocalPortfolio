import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useCoins = <T,>(requestQuery: string): FetchResult<T> => {
  console.log("im here");
  const apiUrl =
    import.meta.env.VITE_PUBLIC_API_URL || "https://api.coingecko.com/api/v3";
  // const apiKey = import.meta.env.VITE_PUBLIC_API_KEY;
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const options = {
    method: "GET",
    url: apiUrl + requestQuery,
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
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

export default useCoins;
