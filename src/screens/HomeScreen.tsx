import { useFetch } from "../hooks";

const HomeScreen = () => {
  const response = useFetch("/check");
  console.log(response);
  return response.isLoading ? (
    <div>loading</div>
  ) : response.error ? (
    <div>error</div>
  ) : (
    response.data.length !== 0 && <div>ok</div>
  );
};

export default HomeScreen;
