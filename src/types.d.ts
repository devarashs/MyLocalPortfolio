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
