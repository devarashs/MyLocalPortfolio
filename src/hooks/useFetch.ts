import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../Store";

const useFetch = <T>(requestQuery: string): FetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const userInfo = useSelector(selectUserInfo);

  const fetchData = async () => {
    if (!userInfo) {
      // Handle the case when userInfo is null
      return;
    }

    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.get(requestQuery, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
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
