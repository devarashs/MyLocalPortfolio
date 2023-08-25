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
