//declare global types - these types will be accessible everywhere

type Property = {
  propertyType: string;
  name: string;
  value: number;
};
type Properties = Array<Property>;

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  preferredCurrency: string;
  isAdmine: boolean;
  token: string;
}

interface UserState {
  userInfo: UserInfo | null;
}

interface FetchResult<T> {
  data: T[];
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

type CustomError = {
  message: string;
  response?: {
    data:
      | {
          message: string;
        }
      | undefined;
  };
};

interface DataArray {
  data: unknown[];
  doRefetch: boolean;
  setDoRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Element {
  __v: number;
  _id: string;
  tag: string;
  category: string;
  valuePerShare: string;
  totalShareAmount: string;
  totalValue: number;
  createdA: string;
  updatedAt: string;
}

interface CoinBoxProps {
  coinRequest: string;
  timeRange: string;
}

interface CoinAttributes {
  name?: string;
  symbol?: string;
  market_data?: {
    [key: string]: { [key: string]: string };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
  };
  description?: { [key: string]: string };
  market_cap_rank?: number;
  total_supply?: number;
  max_supply?: number;
  circulating_supply?: number;
}

interface CoinData {
  data: CoinData[];
}
